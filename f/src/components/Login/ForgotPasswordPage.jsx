import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Reuse your existing login styling
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "./axios"; // Make sure axios is properly configured

const ForgotPasswordPage = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const resetHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.post("/auth/changepassword", {
        username,
        newPassword,
      });

      alert("Password reset successful!");
      navigate("/login"); // ✅ Redirect to login after successful reset
    } catch (err) {
      alert("Reset failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-full-container">
      <div className="login-content-wrapper">
        <div className="login-columns">
          <div className="login-left">
            <h4 className="text-center mb-4">Reset Your Password</h4>
            <form onSubmit={resetHandler}>
              <div className="mb-3">
                <label>USERNAME</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="login-input black-placeholder"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>NEW PASSWORD</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="login-input black-placeholder"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>CONFIRM PASSWORD</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="login-input black-placeholder"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-btn">RESET PASSWORD</button>
            </form>
          </div>
        </div>

        <div className="login-footer">
          <p className="text-center mt-3">
            Back to <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
