import { useEffect, useState, useRef } from "react";
import styles from "../../Styles/ReelAds.module.css";
import Like from "../assets/Like.png";
import Share from "../assets/Share.png";
import Profile from "../assets/BigUser.png";
import Next from "../assets/Next.png";
import Loader from "../components/Loader/Loader";

const reels = [
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
