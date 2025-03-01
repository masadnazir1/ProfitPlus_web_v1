import React, { useState, useEffect, useRef } from "react";
import {
  getRandomDummyImage,
  getRandomDummyName,
} from "../utils/DummyPictures";
import axios from "axios";
import styles from "../../Styles/GamePage.module.css";
import WinnerCard from "../model/WinnerModel";
import LoadingModal from "../model/LoadingModal";
import { io } from "socket.io-client";
import API_URL from "../utils/api";
import Draw from "../model/DrawModel";

const GamePage = () => {
  //Below are the use states to hold the data
  const [board, setBoard] = useState(Array(9).fill(null));
  const [user, setUser] = useState("");
  const [drawmodel, setdrawmodel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [players, setPlayers] = useState({ X: null, O: null });
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState("");
  const [waiting, setWaiting] = useState(true);
  const [gameId, setGameId] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [opponent, setOpponent] = useState(null);
  const [WinnerData, setWinnerData] = useState("");
  const storedUserId = localStorage.getItem("user_id");
  const [dummyUser, setDummyUser] = useState("");
  const [dummyUserName, setDummyUserName] = useState("");
  console.log("dummy username", dummyUserName);
  //
  const socketRef = useRef();

  //
  useEffect(() => {
    if (winner) {
      if (winner == localStorage.getItem("user_id")) {
        const Me = {
          Name: localStorage.getItem("user_name"),
          Pic: localStorage.getItem("user_picture"),
        };
        setWinnerData(Me);
        setIsModalOpen(true);
      } else {
        const opponentWinner = {
          Name: user.username,
          Pic: user.profilepicture,
        };
        setWinnerData(opponentWinner);
        setIsModalOpen(true);
      }
    }
  }, [winner]);

  //extract the opponennet and set in the state
  const opponentId = players[playerSymbol === "X" ? "O" : "X"];
  useEffect(() => {
    if (opponentId) {
      setOpponent(opponentId);
    }
  }, [opponentId]);

  //
  //
  //get the user picture and name to display
  useEffect(() => {
    if (!opponent) return; // Only fetch if opponentId is available
    //
    if (opponent[2] === "T") {
      setDummyUser(getRandomDummyImage());
      setDummyUserName(getRandomDummyName());
      return;
    }
    //
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/userdata`, {
          params: { id: opponent }, // Send ID as a query parameter
        });

        setUser(response.data); // Store user data in state
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [opponent]);
  //
  //
  //

  useEffect(() => {
    socketRef.current = io(API_URL);

    socketRef.current.emit("joinGame", { userId: storedUserId });

    socketRef.current.on("waitingForPlayer", ({ message }) => {
      setWaiting(true);
    });

    socketRef.current.on("gameStarted", (data) => {
      setWaiting(false);
      setGameId(data.gameId); // Store gameId
      setPlayerSymbol(data.players.X === storedUserId ? "X" : "O");
      setPlayers(data.players);
      setBoard(data.board);
      setCurrentTurn(data.currentTurn);
    });

    //
    socketRef.current.on("updateBoard", (data) => {
      setBoard(data.board);
      setCurrentTurn(data.currentTurn);
    });

    socketRef.current.on("gameOver", ({ winner, winningCells }) => {
      setWinner(winner);
      if (winner === null) {
        setdrawmodel(true);
      }
      setWinningCells(winningCells || []);
    });

    return () => {
      socketRef.current.off("waitingForPlayer");
      socketRef.current.off("gameStarted");
      socketRef.current.off("updateBoard");
      socketRef.current.off("gameOver");
      socketRef.current.disconnect();
    };
  }, [storedUserId]);

  const handleMove = (index) => {
    if (board[index] || winner || currentTurn !== playerSymbol) return;

    socketRef.current.emit("makeMove", {
      gameId, // Use stored gameId
      index,
      player: playerSymbol,
      userId: storedUserId,
    });
  };

  if (waiting) {
    return (
      <div className={styles.GamePage}>
        <LoadingModal isOpen={waiting} />
      </div>
    );
  }

  return (
    <div className={styles.GamePage}>
      <section className={styles.YouAre}>
        <p>
          You are playing With: <strong>{dummyUserName}</strong>
          <br></br>
          You are playing as: <strong>{playerSymbol}</strong>
        </p>
      </section>
      {/* Section to display the player detsils  */}
      <section className={styles.PlayerDetailsSection}>
        <div className={styles.Xplayer}>
          <div className={styles.Box}>
            <img
              src={user.profilepicture || dummyUser}
              className={styles.PlayerPicture}
            />
            <h2>{playerSymbol === "X" ? "O" : "X"}</h2>
          </div>
        </div>
        <div className={styles.vsIconBox}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/8431/8431709.png"
            alt="vs"
            className={styles.VSIMG}
          />
          <div className={styles.turnBox}>
            <h2>{winner === null ? "Draw" : `Turn: ${currentTurn}`}</h2>
          </div>
        </div>
        <div className={styles.Oplayer}>
          <div className={styles.Box}>
            <img
              src={localStorage.getItem("user_picture")}
              className={styles.PlayerPicture}
            />
            <h2>{playerSymbol}</h2>
          </div>
        </div>
      </section>
      {/* above Section to display the player detsils  */}

      <section className={styles.gameContainer}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleMove(idx)}
            className={`${styles.gameBox} ${cell ? styles.disabled : ""} 
      ${winningCells.includes(idx) ? styles.winningCell : ""}`}
          >
            {cell}
          </button>
        ))}
        <WinnerCard
          profilePic={WinnerData.Pic || dummyUser}
          userName={WinnerData.Name || dummyUserName}
          WinnerName={WinnerData.Name || dummyUserName}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <Draw isOpen={drawmodel} />
      </section>
    </div>
  );
};

export default GamePage;
