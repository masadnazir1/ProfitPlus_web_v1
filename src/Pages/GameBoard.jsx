import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../../Styles/GamePage.module.css";
import { io } from "socket.io-client";
import API_URL from "../utils/api";

const GamePage = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [user, setUser] = useState(null);

  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [players, setPlayers] = useState({ X: null, O: null });
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [waiting, setWaiting] = useState(true);
  const [gameId, setGameId] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [opponent, setOpponent] = useState(null);
  console.log(winningCells);

  console.log("Game id", gameId);
  const storedUserId = localStorage.getItem("user_id");
  const socketRef = useRef();

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
    const fetchUserData = async () => {
      console.log(opponent);
      try {
        const response = await axios.get(`${API_URL}/api/auth/userdata`, {
          params: { id: opponent }, // Send ID as a query parameter
        });

        setUser(response.data); // Store user data in state
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
        <h2>Waiting for another player to join...</h2>
      </div>
    );
  }

  return (
    <div className={styles.GamePage}>
      {winner ? (
        <h1>Winner: {winner}</h1>
      ) : (
        <h2>Current Turn: {currentTurn}</h2>
      )}
      <p>
        You are playing as: <strong>{playerSymbol}</strong>
      </p>
      <p>
        Opponent:{" "}
        <strong>
          {players[playerSymbol === "X" ? "O" : "X"] || "Waiting..."}
        </strong>
      </p>

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
      </section>
    </div>
  );
};

export default GamePage;
