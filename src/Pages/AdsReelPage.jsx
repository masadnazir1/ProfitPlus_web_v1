import { useEffect, useState, useRef } from "react";
import styles from "../../Styles/ReelAds.module.css";
import Like from "../assets/Like.png";
import Share from "../assets/Share.png";
import Profile from "../assets/BigUser.png";
import Next from "../assets/Next.png";
import Loader from "../components/Loader/Loader";

const reels = [
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
];

const ReelAds = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const reelRef = useRef(null);

  const handleNext = () => {
    setLoading(true); // Show loader when index changes
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reels.length);
    setLoading(false); // Show loader when index changes
  };
  //
  const handlePrev = () => {
    setLoading(true); // Show loader when index changes
    setCurrentIndex((prevIndex) => (prevIndex - 1) % reels.length);
    setLoading(false); // Show loader when index changes
  };
  //
  //
  useEffect(() => {
    setLoading(true); // Show loader when index changes
    const interval = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reels.length);
    }, 2000); // Change reel after 5 seconds
    setLoading(false); // Show loader when index changes
    return () => clearTimeout(interval);
  }, [currentIndex]);

  return (
    <div className={styles.reelContainer}>
      <div className={styles.innerContainer}>
        {loading ? (
          <Loader />
        ) : (
          <iframe
            src={reels[currentIndex]}
            title="Ad Reel"
            className={styles.reelVideo}
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></iframe>
        )}

        <div className={styles.overlay}>
          <div className={styles.controls}>
            <button className={styles.controlButton}>
              <img src={Like} alt="" />
            </button>
            <button className={styles.controlButton}>
              <img src={Share} alt="" />
            </button>
            <button className={styles.controlButton}>
              <img src={Profile} alt="" />
            </button>
          </div>
        </div>
        <section className={styles.ReelHandle}>
          <button className={styles.PrevButton} onClick={handlePrev}>
            <img src={Next} alt="next Ad" className={styles.handlePrevImg} />
          </button>
          <button className={styles.nextButton} onClick={handleNext}>
            <img src={Next} alt="next Ad" className={styles.NextIMG} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ReelAds;
