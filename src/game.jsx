import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const GamePage = () => {
  const [gameId] = useState("e1f63d7e-7c74-480a-ba75-3634cfdb5c73"); // Static game ID for testing
  const [players] = useState({
    X: "a49eecaf-769e-4835-9713-e55cd2a1d73c",
    O: "5bd9d897-b876-43d5-ae45-2d4d036e4921",
  });

  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.emit("joinGame", { gameId });

    socket.on("updateBoard", (game) => {
      setBoard(game.board);
    });

    socket.on("gameOver", ({ winner }) => {
      setWinner(winner);
    });

    return () => {
      socket.off("updateBoard");
      socket.off("gameOver");
    };
  }, [gameId]);

  const handleMove = (index) => {
    if (board[index] || winner) return; // Ignore if cell is taken or game is over

    socket.emit("makeMove", {
      gameId,
      index,
      player: currentPlayer, // "X" or "O"
      playerId: currentPlayer === "X" ? players.X : players.O, // Pass actual player ID
      playerX: players.X,
      playerO: players.O,
    });

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Tic-Tac-Toe (Socket Test)</h2>
      <p>Game ID: {gameId}</p>
      <p>Player X: {players.X}</p>
      <p>Player O: {players.O}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
          margin: "20px auto",
          width: "320px",
        }}
      >
        {board.map((cell, idx) => (
          <div
            key={idx}
            onClick={() => handleMove(idx)}
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              border: "2px solid #000",
              cursor: cell ? "not-allowed" : "pointer",
              backgroundColor: cell ? "#ddd" : "#fff",
            }}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner ? (
        <h3>{winner === "draw" ? "Game Draw!" : `Winner: ${winner}`}</h3>
      ) : (
        <h3>Next Turn: {currentPlayer}</h3>
      )}
    </div>
  );
};

export default GamePage;
