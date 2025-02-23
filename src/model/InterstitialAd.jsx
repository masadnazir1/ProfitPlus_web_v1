import React, { useState, useEffect } from "react";
import styles from "../../Styles/InterstitialAd.module.css";

const InterstitialAd = ({ adUrl, isOpen, onClose }) => {
  const [showAd, setShowAd] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowAd(true);
      setShowModal(false);
      const timer = setTimeout(() => {
        setShowAd(false);
        setShowModal(true);
      }, 40000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      {showAd && (
        <div className={styles.adContainer}>
          <iframe
            src={adUrl}
            title="Interstitial Ad"
            className={styles.iframe}
            allowFullScreen
          ></iframe>
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
