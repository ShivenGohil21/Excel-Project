import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "./axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/auth/register", {
      username,
      email,
      password
    });
    localStorage.setItem("userEmail", email);
    alert("Signup success!");
    navigate("/login");
  } catch (err) {
    alert("Signup failed: " + (err.response?.data?.message || err.message));
  }
};


  return (
    <div className="login-full-container">
      <div className="login-content-wrapper">
        <div className="login-columns">
          <div className="login-left">
            <h4 className="text-center mb-4">Create your MyBlog account</h4>
            <form onSubmit={signupHandler}>
              <div className="mb-3">
                <label>FULL NAME</label>
                <input type="text" className="login-input black-placeholder"
                       placeholder="Full Name" value={username}
                       onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>EMAIL ADDRESS</label>
                <input type="email" className="login-input black-placeholder"
                       placeholder="Email" value={email}
                       onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>PASSWORD</label>
                <input type="password" className="login-input black-placeholder"
                       placeholder="Password" value={password}
                       onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="login-btn">SIGN UP</button>
            </form>
          </div>
        </div>

        <div className="login-footer">
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
