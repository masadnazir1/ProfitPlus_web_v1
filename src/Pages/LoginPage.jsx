import React from "react";
import GoogleAuth from "../components/GoogleAuth";
import styles from "../../Styles/WelcomePage.module.css";
import logo from "../assets/logo.png";

const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="AdEarner Logo" className={styles.logo} />
        <h1 className={styles.title}>Welcome to ProfitPlus!</h1>
        <p className={styles.subtitle}>
          Watch ads, earn rewards, and cash out instantly. Join now!
        </p>
        <section className={styles.GoogleAuthLogin}>
          <GoogleAuth />
        </section>

        <p className={styles.trustText}>
          100% Secure | Instant Withdrawals | No Extra Permissions
        </p>
      </div>
      <footer className={styles.footer}>
        <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default WelcomePage;
