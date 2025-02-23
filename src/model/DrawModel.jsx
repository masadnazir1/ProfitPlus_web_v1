import React from "react";
import styles from "../../Styles/LoadingModal.module.css";
import { useNavigate } from "react-router-dom";

const Draw = ({ isOpen }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h1 className={styles.DrawText}>Draw!</h1>
        <h2 className={styles.waitingTextDraw}>
          Stalemate! Even the game is confused. 😆
        </h2>
        <button
          className={styles.Draw}
          onClick={() => window.location.reload()}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Draw;
