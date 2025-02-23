import React from "react";
import styles from "../../Styles/WinnerCard.module.css";

const WinnerCard = ({ profilePic, userName, WinnerName, isOpen, onClose }) => {
  if (!isOpen) return null; // Hide the modal if not open

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.profileSection}>
          <div className={styles.profilePicContainer}>
            <img src={profilePic} alt="Profile" className={styles.profilePic} />
            <div className={styles.crown}>👑</div>
          </div>
          <p className={styles.userName}>{userName}</p>
        </div>
        <div className={styles.congratulationsSection}>
          <div className={styles.stars}>⭐ ⭐ ⭐</div>
          <h2>Congratulations!</h2>
          <p>{WinnerName} Won the Game!</p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className={styles.PlayAgian}
        >
          Play again
        </button>
      </div>
    </div>
  );
};

export default WinnerCard;
