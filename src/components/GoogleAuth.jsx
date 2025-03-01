import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import API_URL from "../utils/api";

const GoogleAuth = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const handleSuccess = async (response) => {
    setLoading(true); // Show loading in parent
    setAuthLoading(true); // Show loading in this component
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
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="411862526595-a9ugd2nrsaidg8e9rutgo10pu12rcsap.apps.googleusercontent.com">
      {authLoading ? (
        <p>Loading...</p> // Show loading text (you can use a spinner here)
      ) : (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Login Failed")}
        />
      )}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
