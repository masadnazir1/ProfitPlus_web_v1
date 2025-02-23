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
            <div className={styles.crown}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2460/2460529.png"
                alt=""
                className={styles.crownPic}
              />
            </div>
          </div>
          {/* <p className={styles.userName}>{userName}</p> */}
          <div className={styles.details}>
            <h2 className={styles.congrats}>Congratulations!</h2>
            <h2 className={styles.congrats}>TO</h2>
            <h2 className={styles.congratsName}>{WinnerName}</h2>
          </div>
        </div>
        <div className={styles.congratulationsSection}>
          <div className={styles.stars}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/7656/7656139.png"
              alt=""
              className={styles.bigstar}
            />
          </div>
          <div className={styles.stars}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/7656/7656139.png"
              alt=""
              className={styles.littlestars}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/7656/7656139.png"
              alt=""
              className={styles.littlestars}
            />
          </div>

          <p className={styles.WinnerName}>{WinnerName} Won the Game!</p>
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
