import React, { useState, useEffect } from "react";
import styles from "../../Styles/IframeAd.module.css"; // Import CSS module

const IframeAd = ({ title = "Advertisement", className = "" }) => {
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
