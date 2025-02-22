import React from "react";
import GoogleAuth from "../components/GoogleAuth";
import styles from "../../Styles/WelcomePage.module.css";
import logo from "../assets/logo.png";

const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt="profitplus" className={styles.logo} />
      <h1 className={styles.title}>Welcome to AdEarner!</h1>
      <p className={styles.subtitle}>
        Watch ads, earn rewards, and cash out instantly. Join now!
      </p>
      <GoogleAuth />
      <p className={styles.trustText}>
        ✔️ 100% Secure | ✔️ Instant Withdrawals | ✔️ No Extra Permissions
      </p>

      <footer className={styles.footer}>
        <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default WelcomePage;
