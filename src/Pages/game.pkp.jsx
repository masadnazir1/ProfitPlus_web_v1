import React, { useState, useEffect, useRef } from "react";
import styles from "../../Styles/GamePage.module.css";
import { io } from "socket.io-client";

const GamePage = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState(null); // "X" or "O"
  const [players, setPlayers] = useState({ X: null, O: null });
  const [currentTurn, setCurrentTurn] = useState("X");
  const storedUserId = localStorage.getItem("user_id");
  const [gameId] = useState("a07cfa4e-7ee3-4149-95af-4065d1889108");
  const [winner, setWinner] = useState(null);
  //
  // console.log(players);
  const opponent = storedUserId === players.X ? players.O : players.X;
  console.log("Player opponent:", opponent, "Stored User ID:", storedUserId);

  // Create the socket only once using useRef
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.emit("joinGame", { gameId, userId: storedUserId });

    socketRef.current.on("playerAssigned", (data) => {
      setPlayerSymbol(data.symbol);
      setPlayers(data.players);
      setBoard(data.board);
      setCurrentTurn(data.currentTurn);
    });

    socketRef.current.on("updateBoard", (data) => {
      setBoard(data.board);
      setCurrentTurn(data.currentTurn);
    });

    socketRef.current.on("gameOver", ({ winner }) => {
      setWinner(winner);
    });

    return () => {
      socketRef.current.off("playerAssigned");
      socketRef.current.off("updateBoard");
      socketRef.current.off("gameOver");
      socketRef.current.disconnect();
    };
  }, [gameId, storedUserId]);

  const handleMove = (index) => {
    // console.log("index of box", index);
    if (board[index] || winner || currentTurn !== playerSymbol) return;

    socketRef.current.emit("makeMove", {
      gameId,
      index,
      player: playerSymbol,
      userId: storedUserId,
    });
  };

  return (
    <div className={styles.GamePage}>
      <h1>{winner}</h1>
      <strong>Me is {playerSymbol}</strong>
      <p>Playing with {opponent}</p>
      <h2>
        {" "}
        CurrentTurn For<strong>{currentTurn} </strong>
      </h2>
      <section className={styles.gameContainer}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleMove(idx)}
            className={`${styles.gameBox} ${cell ? styles.disabled : ""}`}
          >
            {cell}
          </button>
        ))}
      </section>
    </div>
  );
};

export default GamePage;
