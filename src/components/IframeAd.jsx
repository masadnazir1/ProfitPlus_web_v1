import React, { useState, useEffect } from "react";
import styles from "../../Styles/IframeAd.module.css"; // Import CSS module

const IframeAd = ({ title = "Advertisement", className = "" }) => {
  const adUrls = [
    "https://roubauteezavoak.net/4/9031398",

    "https://roubauteezavoak.net/4/9031395",
    "https://www.effectiveratecpm.com/dc3yy8dsr?key=37ef9831979db51a3c4f885f5ea31b2c",
    "https://roubauteezavoak.net/4/9031396",
    "https://www.effectiveratecpm.com/dc3yy8dsr?key=37ef9831979db51a3c4f885f5ea31b2c",
    "https://roubauteezavoak.net/4/9031397",
    "https://www.effectiveratecpm.com/ver7ijkg?key=69c8b0d6deac7863ed5251bd6312c228",
    "https://www.effectiveratecpm.com/dc3yy8dsr?key=37ef9831979db51a3c4f885f5ea31b2c",
    "https://www.effectiveratecpm.com/ver7ijkg?key=69c8b0d6deac7863ed5251bd6312c228",
  ]; // ✅ List of ad URLs

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adUrls.length);
    }, 30000); // ✅ Change ad every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={`${styles.iframeContainer} ${className}`}>
      <iframe
        src={adUrls[currentAdIndex]}
        title={title}
        className={styles.iframe}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default IframeAd;
