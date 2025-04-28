import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [loginEmail, setLoginEmail] = useState(""); // Login email input
  const [loginPassword, setLoginPassword] = useState(""); // Login password input
  const [loginMessage, setLoginMessage] = useState(""); // Feedback message after login attempt
  const [authToken, setAuthToken] = useState(""); // JWT or token from backend on successful login

  const formatErrorMessage = (errorResponse) => {
    if (errorResponse && typeof errorResponse === "object") {
      if (Array.isArray(errorResponse)) {
        return errorResponse.map((err) => err.msg).join(", ");
      }
      return errorResponse.msg || "An unknown error occurred";
    }
    return errorResponse;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email: loginEmail,
        password: loginPassword,
      });
      setLoginMessage(response.data.message);

      const token = response.data.token;
      setAuthToken(token); // Store token in state
      localStorage.setItem("authToken", token); // Save token in localStorage for persistence

      // Redirect user to the Home page on successful login
      window.location.href = "/home";
    } catch (error) {
      if (error.response) {
        setLoginMessage(formatErrorMessage(error.response.data.detail));
      } else {
        setLoginMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    setAuthToken(""); // Clear authentication token from state
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setLoginMessage("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            className="input login-input"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            className="input login-input"
          />
        </div>
        <button type="submit" className="login">Login</button>
        <button type="button" onClick={handleLogout} className="logout">
          Logout
        </button>
        <Link to='/Register'> {/* <button type="submit" className="register">Register</button>*/ } 
        <p className="register-link">Don't have an Account? <span> Register here!</span></p></Link>
      </form>
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
}

export default Login;
