import styles from "../../Styles/Profile.module.css";
import React, { useEffect, useState } from "react";
import API_URL from "../utils/api";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Profile = () => {
  //usestates
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const UserName = localStorage.getItem("user_name");
  const ProfilePicture = localStorage.getItem("user_picture");
  const UserEmail = localStorage.getItem("user_email");
  //

  const HandleLogout = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      localStorage.removeItem("user_id"); // Replace with your key
      navigate("/login");
      // alert("Item removed from local storage!");
    }
  };
  //
  //hanlders and useeffects
  useEffect(() => {
    const trasaction = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/points/transactions/${localStorage.getItem(
            "user_id"
          )}`
        );
        console.log(response.data.transactions);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.log(error);
        {
        }
      }
    };
    //
    trasaction();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <section className={styles.ProfileDetails}>
          <div className={styles.Left}>
            <img
              src={
                ProfilePicture ||
                "https://cdn-icons-png.flaticon.com/128/64/64572.png"
              }
              alt="user"
              className={styles.picture}
            />
          </div>
          <div className={styles.Right}>
            <div className={styles.middleRight}>
              <h2 className={styles.UserName}>{UserName}</h2>
              <h5 className={styles.UserEmail}>{UserEmail}</h5>
            </div>
          </div>
        </section>
        <section className={styles.walletActions}>
          <button className={styles.WithdrawBtn}>Withdraw</button>
          <button className={styles.InvestBtn} onClick={HandleLogout}>
            Logout
          </button>
        </section>
        <section className={styles.transections}>
          <strong className={styles.resentH}>Recent Transactions</strong>

          {transactions.map((txn) => (
            <div key={txn.id} className={styles.TransectonBox}>
              {/* Wallet Icon */}
              <div className={styles.Wallet}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/60/60484.png"
                  alt="wallet"
                  className={styles.WalletIcon}
                />
              </div>

              {/* Middle Details (Type & Timestamp) */}
              <div className={styles.middleDetails}>
                <div className={styles.type}>
                  {txn.type === "earn" ? (
                    <span className={styles.earn}>Earned</span>
                  ) : (
                    <span className={styles.withdraw}>Withdrawn</span>
                  )}
                </div>
                <div className={styles.timestamp}>
                  {new Date(txn.created_at).toLocaleString()}
                </div>
              </div>

              {/* Amount in PKR */}
              <div className={styles.PKR}>
                <strong className={styles.amount}>
                  {txn.type === "earn" ? "+" : "-"} {txn.amount} PKR
                </strong>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Profile;
