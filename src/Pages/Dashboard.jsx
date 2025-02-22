import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    // Redirect to login if no user data is found
    navigate("/");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <img src={user.picture} alt="User" width="100" />
      <br />
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
};

export default Dashboard;
