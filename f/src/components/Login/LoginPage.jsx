


import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "./axios.jsx"; // uses your pre-configured instance
const LoginPage = ({ setIsLoggedIn, setUserEmail }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("userEmail", email);
      setIsLoggedIn(true);
      setUserEmail(email);
      alert("Login success!");
      navigate("/Mainpage");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  // ... rest of the component


  return (
    <div className="login-full-container">
      <div className="login-content-wrapper">
        <div className="login-columns">
          <div className="login-left">
            <h4 className="text-center mb-4">Log into MyBlog</h4>
            <Form onSubmit={loginHandler}>
              <Form.Group className="mb-4">
                <Form.Label>EMAIL ADDRESS</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="login-input black-placeholder"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>PASSWORD</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="login-btn">LOG IN</Button>
            </Form>
          </div>
        </div>

        

        <div className="login-footer">
          <p className="text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <p className="text-center mt-3">
            Can't log in? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
