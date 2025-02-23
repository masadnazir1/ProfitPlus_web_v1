import { useState } from "react";
import styles from "../../Styles/Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //init thge useNavigate
  const navigate = useNavigate();
  const [points, setPoints] = useState(3000);
  const [progress, setProgress] = useState(60); // Initial progress value
  const total = 100; // Maximum progress value
  const radius = 50; // Circle radius
  const strokeWidth = 10; // Thickness of the stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progressValue = Math.min(Math.max(progress, 0), total); // Ensure progress is within bounds
  const offset = circumference - (progressValue / total) * circumference; // Calculate offset

  return (
    <div className={styles.container}>
      <section className={styles.Dashboard}>
        <h1 className={styles.MyReward}>My Reward</h1>
        <div className={styles.innerBox}>
          <div className={styles.left}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/15660/15660192.png"
              alt="reward"
              className={styles.reardicon}
            />
            <svg width="120" height="120" viewBox="0 0 120 120">
              {/* Background Circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#ddd"
                strokeWidth={strokeWidth}
              />
              {/* Progress Circle */}

              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#3498db"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)" // Rotate for proper start position
              />
            </svg>
          </div>
          <div className={styles.Right}>
            <strong className={styles.points}>
              {`${progress} / ${total}`}pts
            </strong>
            <p className={styles.note}>Minimum withdrawal amount is 5000 pts</p>
          </div>
        </div>
      </section>
      <section className={styles.gamesAndRewards}>
        Play Game and earn reward
        <div className={styles.gameRowBox}>
          <div className={styles.Left}>
            {" "}
            <strong className={styles.PlayText}>Play to earn the points</strong>
          </div>
          <div className={styles.RightBox}>
            <button
              className={styles.PlayGame}
              onClick={() => navigate("/game")}
            >
              Play
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
