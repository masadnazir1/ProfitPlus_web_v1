import React, { useState } from "react";
import axios from "axios";
import styles from "../../Styles/req.module.css";
import API_URL from "../utils/api";
import Loader from "../components/Loader/Loader";

const WithdrawalRequest = () => {
  const [Easypaisa, setEasypaisa] = useState("");
  const [Rs, setRs] = useState("");
  const [status, setStatus] = useState("pending"); // Default status is "pending"
  const [user_id, setUser_id] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState(localStorage.getItem("user_name"));
  const [message, setMessage] = useState(""); // To display success/error messages
  const [loading, setLoading] = useState(false); // To track if the request is in progress
  const [Email, setEmail] = useState("");

  // Handle form submission
  const HandleWithdraw = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    setLoading(true); // Start loading

    if (Rs < 1000) {
      setMessage("Minimum withdrawal amount is 1000"); // Error message
      setLoading(false);
      return;
    }
    if (Easypaisa.length < 11) {
      setMessage("Invalid Easypaisa Number"); // Error message
      setLoading(false);
      return;
    }
    if (Email.length < 1) {
      setMessage("Invalid Email Address"); // Error message
      setLoading(false);
      return;
    }
    if (user_id === null) {
      setLoading(false);
      setMessage("You are not logged in"); // Error message
      return;
    }

    // Withdraw

    try {
      const response = await axios.post(`${API_URL}/api/points/withdraw/`, {
        userId: user_id,
        amount: Rs,
      });

      if (response.data.success === true) {
        setMessage("Points withdrawn successfully!"); // Success message
      } else {
        setMessage("Error withdrawing points!"); // Error message
        return;
      }
    } catch (error) {
      alert("You don't have sufficient points."); // Error message
      setLoading(false);
      return;
    }
    //
    //
    try {
      const response = await axios.post(`${API_URL}/api/withdrawal/request`, {
        user_id,
        username,
        Easypaisa,
        status,
        Rs,
      });
      //
      //send notification
      try {
        const notification = await axios.post(
          `${API_URL}/api/notifications/add`,
          {
            userId: user_id,
            message: `Your withdrawal request of Rs ${Rs} has been created successfully! we will process and transfer to your account!`,
          }
        );
      } catch (error) {
        console.error(error);
      }

      setMessage(
        "Withdrawal request created successfully we will process and trassfer to your account!"
      ); // Success message
    } catch (error) {
      setMessage("Error creating withdrawal request!"); // Error message
    }

    setLoading(false); // End loading
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <h2>Withdrawal Request Form</h2>

        {/* Displaying the message */}
        {message && <p>{message}</p>}

        {/* The form to collect the withdrawal request details */}
        <form onSubmit={HandleWithdraw}>
          <div className={styles.inputField}>
            <label htmlFor="Easypaisa">Easypaisa Number:</label>
            <input
              type="text"
              id="Easypaisa"
              value={Easypaisa}
              onChange={(e) => setEasypaisa(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="Email">Email Address:</label>
            <input
              type="text"
              id="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputField}>
            <label htmlFor="Rs">Amount (Rs):</label>
            <input
              type="number"
              id="Rs"
              value={Rs}
              onChange={(e) => setRs(e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? <Loader /> : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalRequest;
