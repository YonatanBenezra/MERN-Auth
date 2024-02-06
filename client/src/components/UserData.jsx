import React, { useState, useEffect } from "react";
import axios from "axios";

const Authenticate = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/authenticate`,
          { withCredentials: true } // מכיל את הקוקי
        );
        setUser(response.data);
        setError("");
      } catch (err) {
        console.error("Authentication error:", err);
        setError("Failed to authenticate. Please login again.");
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Authenticated User Details:</h2>
          <p>
            <strong>ID:</strong> {user._id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default Authenticate;
