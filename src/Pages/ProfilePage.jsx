import styles from "../../Styles/Profile.module.css";

const Profile = () => {
  const UserName = localStorage.getItem("user_name");

  const ProfilePicture = localStorage.getItem("user_picture");
  const UserEmail = localStorage.getItem("user_email");
  return (
    <div className={styles.container}>
      <section className={styles.ProfileDetails}>
        <div className={styles.Left}>
          <img src={ProfilePicture} alt="user" className={styles.picture} />
        </div>
        <div className={styles.Right}>
          <div className={styles.middleRight}>
            <h2 className={styles.UserName}>{UserName}</h2>
            <h5 className={styles.UserEmail}>{UserEmail}</h5>
          </div>
        </div>
      </section>
      <section className={styles.transections}>
        <strong className={styles.resentH}>Recent Transactions</strong>

        <div className={styles.TransectonBox}>
          <div className={styles.Wallet}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/60/60484.png"
              alt="wallet cl"
              className={styles.WalletIcon}
            />
          </div>
          <div className={styles.middleDetails}>
            <div className={styles.type}></div>
            <div className={styles.timestamp}></div>
          </div>
          <div className={styles.PKR}>
            <strong>7000PKR</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
