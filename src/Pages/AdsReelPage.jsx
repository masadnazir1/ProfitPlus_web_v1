import { useEffect, useState, useRef } from "react";
import styles from "../../Styles/ReelAds.module.css";
import axios from "axios";
import Like from "../assets/Like.png";
import Share from "../assets/Share.png";
import Profile from "../assets/BigUser.png";
import Loader from "../components/Loader/Loader";

const API_KEY = "AIzaSyDYgCyj75W6MZQkWcCyI2R-sOd4xDdsrFU";
const SEARCH_QUERY = "funny shorts India Pakistan";

const MAX_RESULTS = 100;

const ReelAds = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              key: API_KEY,
              q: SEARCH_QUERY,
              part: "snippet",
              maxResults: MAX_RESULTS,
              type: "video",
            },
          }
        );
        setVideos(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []); // ✅ Empty array ensures it runs only once

  // Swipe Handling
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY.current - touchEndY;

    if (swipeDistance > 50 && currentIndex < videos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (swipeDistance < -50 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" && currentIndex < videos.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, videos.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${
        currentIndex * 100
      }vh)`;
    }
  }, [currentIndex]);

  return (
    <div
      className={styles.reelContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.videoWrapper} ref={containerRef}>
          {videos.map((video, index) => (
            <div key={video.id.videoId} className={styles.videoContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
                title="YouTube Reel"
                className={styles.reelVideo}
                frameBorder="0"
                allow="autoplay; fullscreen"
              ></iframe>
              <div className={styles.overlay}>
                <div className={styles.controls}>
                  <button className={styles.controlButton}>
                    <img src={Like} alt="Like" />
                  </button>
                  <button className={styles.controlButton}>
                    <img src={Share} alt="Share" />
                  </button>
                  <button className={styles.controlButton}>
                    <img src={Profile} alt="Profile" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReelAds;
