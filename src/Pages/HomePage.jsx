import { useState, useEffect } from "react";
import styles from "../../Styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import getUserScore from "../utils/getUserScore";

const Home = () => {
  //init thge useNavigate
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(); // Initial progress value
  const total = 3000; // Maximum progress value
  const radius = 50; // Circle radius
  const strokeWidth = 10; // Thickness of the stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progressValue = Math.min(Math.max(progress, 0), total); // Ensure progress is within bounds
  const offset = circumference - (progressValue / total) * circumference; // Calculate offset

  //

  //Handlers
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    console.log(userId);
    if (!userId) return;
    // if (localStorage.getItem("score") > 0) {
    //   setProgress(localStorage.getItem("score"));
    //   return;
    // }

    const fetchScore = async () => {
      setLoading(true);
      try {
        const data = await getUserScore(userId);
        localStorage.setItem("score", data.wins);
        setLoading(false);
        setProgress(data.wins);
      } catch (err) {
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
        console.info("data fetched");
      }
    };
    fetchScore();
  }, [userId]);

  //
  useEffect(() => {
    const LogedIn = localStorage.getItem("user_id");
    if (!LogedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.Dashboard}>
        <h1 className={styles.MyReward}>My Rewards!</h1>
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
            {loading ? (
              <p>Loading...</p>
            ) : (
              <strong className={styles.points}>
                {`${progress} / ${total}`}pts
              </strong>
            )}

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
