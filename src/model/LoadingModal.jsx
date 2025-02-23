import React from "react";
import styles from "../../Styles/LoadingModal.module.css";

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.spinner}></div>
        <h2 className={styles.waitingText}>
          Waiting for another player to join...
        </h2>
      </div>
    </div>
  );
};

export default LoadingModal;
