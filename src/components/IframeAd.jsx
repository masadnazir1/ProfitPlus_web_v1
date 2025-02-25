import React, { useState, useEffect } from "react";
import styles from "../../Styles/IframeAd.module.css"; // Import CSS module

const IframeAd = ({ title = "Advertisement", className = "" }) => {
  const adUrls = [
    "https://www.effectiveratecpm.com/uv23ae2yqt?key=464ffb59ddc88ed472bc2535e2b8bc5c",
    "https://www.effectiveratecpm.com/p473n3es7w?key=e37750a23f6177d6d4c9b1bbec2bd597",
    "https://www.effectiveratecpm.com/semajke5?key=f9638a9a5f88315ae5fb17fa8495ca72",
    "https://www.effectiveratecpm.com/xde4dnfypt?key=9212d26fa0f0f6895a6e384a1ed043de",
    "https://chilsihooveek.net/4/9006385",
    "https://chilsihooveek.net/4/7194013",
    "https://chilsihooveek.net/4/7195957",
    "https://chilsihooveek.net/4/8947104",
    "https://chilsihooveek.net/4/8947106",
    "https://chilsihooveek.net/4/8947108",
  ]; // ✅ List of ad URLs

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adUrls.length);
    }, 10000); // ✅ Change ad every 5 seconds

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
