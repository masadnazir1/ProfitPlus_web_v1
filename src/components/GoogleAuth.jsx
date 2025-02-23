import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import API_URL from "../utils/api";

const GoogleAuth = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleSuccess = async (response) => {
    console.log("Login Success:", response);

    try {
      const res = await fetch(`${API_URL}/api/auth/Google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }), // Send token to backend
      });

      const data = await res.json();

      if (data.success) {
        //
        //
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("user_name", data.user.name);
        localStorage.setItem("user_picture", data.user.picture);
        localStorage.setItem("user_email", data.user.email);
        //

        //
        navigate("/");
      } else {
        console.log("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="411862526595-a9ugd2nrsaidg8e9rutgo10pu12rcsap.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
