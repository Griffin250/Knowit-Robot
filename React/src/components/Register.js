import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [registerEmail, setRegisterEmail] = useState(""); // Registration email input
  const [registerPassword, setRegisterPassword] = useState(""); // Registration password input
  const [registerMessage, setRegisterMessage] = useState(""); // Feedback message after registration attempt

  const formatErrorMessage = (errorResponse) => {
    if (errorResponse && typeof errorResponse === "object") {
      if (Array.isArray(errorResponse)) {
        return errorResponse.map((err) => err.msg).join(", ");
      }
      return errorResponse.msg || "An unknown error occurred";
    }
    return errorResponse;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/register", {
        email: registerEmail,
        password: registerPassword,
      });
      setRegisterMessage(response.data.message);
      window.location.href="/home";
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      if (error.response) {
        setRegisterMessage(formatErrorMessage(error.response.data.detail));
      } else {
        setRegisterMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="register">Register</button>
        <Link to='/Login'> {/*<button type="submit" className="login">Login</button> */}
         <p className="login-link">Already have an Account? <span>Login here!</span></p></Link>
      </form>
      {registerMessage && <p>{registerMessage}</p>}
    </div>
  );
}

export default Register;
