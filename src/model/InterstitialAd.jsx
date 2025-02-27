import React, { useState, useEffect } from "react";
import styles from "../../Styles/InterstitialAd.module.css";
import postPoints from "../utils/postPoints";

const InterstitialAd = ({ isOpen, onClose }) => {
  const adUrls = [
    "https://www.effectiveratecpm.com/semajke5?key=f9638a9a5f88315ae5fb17fa8495ca72",
    "https://www.effectiveratecpm.com/xde4dnfypt?key=9212d26fa0f0f6895a6e384a1ed043de",
    "https://www.effectiveratecpm.com/p473n3es7w?key=e37750a23f6177d6d4c9b1bbec2bd597",
    "https://www.effectiveratecpm.com/uv23ae2yqt?key=464ffb59ddc88ed472bc2535e2b8bc5c",
    "https://www.effectiveratecpm.com/ifzqe374ym?key=637b7bcfd4cd10301f7ed3b355b86261",
    "https://www.effectiveratecpm.com/z8aj3g8sc?key=f8b0b79f6e76d59232cea18c00ab1952",
    "https://www.effectiveratecpm.com/eqincybw?key=d2a053d841d6a927e1a7645ef259afe3",
    "https://www.effectiveratecpm.com/htafsev3?key=d5e04cc34047b2d509a213c46c85ed20",
    "https://www.effectiveratecpm.com/xam55ign7?key=0427227ca0a2cb18d36c492559eba98f",
    "https://www.effectiveratecpm.com/nub0sunjf?key=6b1e2bb66dfa2d12119af9bf833091f8",
    "https://www.effectiveratecpm.com/mbbpkdjm?key=44af5eefee03340cc91f320100c6fb6c",
    "https://www.effectiveratecpm.com/phcwujzmj?key=e89cbf6a4800dfc3506a03cd96658c11",
    "https://www.effectiveratecpm.com/xc4tp302j?key=c35d2006aa5d11a0c84e1ae142fbb502",
    "https://www.effectiveratecpm.com/g92h8t87?key=eb0903e627baeb65f48c0b43c6d059b6",
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
