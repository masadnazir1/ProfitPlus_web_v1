import React, { useState, useEffect } from "react";
import styles from "../../Styles/InterstitialAd.module.css";
import postPoints from "../utils/postPoints";

const InterstitialAd = ({ isOpen, onClose }) => {
  const adUrls = [
    "https://roubauteezavoak.net/4/9031398",
    "https://roubauteezavoak.net/4/9031397",
    "https://roubauteezavoak.net/4/9031396",
    "https://roubauteezavoak.net/4/9031395",
    "https://roubauteezavoak.net/4/7194013",
    "https://roubauteezavoak.net/4/7195957",
    "https://roubauteezavoak.net/4/8947104",
    "https://roubauteezavoak.net/4/8947106",
    "https://roubauteezavoak.net/4/8947108",
    "https://roubauteezavoak.net/4/9006385",
  ]; // ✅ Add your ad URLs here

  const totalTime = 60; // Total ad duration in seconds
  const adDuration = 5; // Time each ad is shown (5s per ad)

  const [showAd, setShowAd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const userId = localStorage.getItem("user_id");
  const points = 1; // Example points

  // Function to post points
  const handleEarnPoints = async () => {
    try {
      const response = await postPoints(userId, points);
      console.log("Points added successfully:", response);
    } catch (error) {
      console.error("Failed to add points:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setShowAd(true);
      setShowModal(false);
      setTimeLeft(totalTime); // Reset timer
      setCurrentAdIndex(0); // Start from the first ad

      // Countdown Timer
      const countdown = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // Change Ad every `adDuration` seconds
      const adSwitchInterval = setInterval(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adUrls.length);
      }, adDuration * 1000);

      // Automatically post points and close ad after `totalTime` seconds
      const timer = setTimeout(() => {
        handleEarnPoints();
        setShowAd(false);
        setShowModal(true);
        clearInterval(countdown);
        clearInterval(adSwitchInterval);
      }, totalTime * 1000);

      // Cleanup
      return () => {
        clearTimeout(timer);
        clearInterval(countdown);
        clearInterval(adSwitchInterval);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      {showAd && (
        <div className={styles.adContainer}>
          <iframe
            src={adUrls[currentAdIndex]} // ✅ Switch ads dynamically
            title="Interstitial Ad"
            className={styles.iframe}
            allowFullScreen
          ></iframe>
          <div className={styles.timer}>Reward in: {timeLeft}s</div>{" "}
          {/* ✅ Show Timer */}
        </div>
      )}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>Ad time is over. You may continue.</p>
            <button className={styles.closeButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterstitialAd;
