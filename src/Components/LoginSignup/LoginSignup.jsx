import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [validationMessage, setValidationMessage] = useState("");
  const validateAction = (type) => {
    if (type === "signup") {
      if (action === "Sign Up" && !/^[a-zA-Z ]+$/.test(name)) {
        setValidationMessage("Please enter a valid name.");
        return false;
      }
    }

    if (!email) {
      setValidationMessage("Please enter your email.");
      return false;
    }
    if (!password) {
      setValidationMessage("Please enter your password.");
      return false;
    }
    if (password.length < 6) {
      setValidationMessage(
        "Password is too short. Must be at least 6 characters."
      );
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setValidationMessage("Invalid email format.");
      return false;
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{6,}$/.test(password)) {
      setValidationMessage("Password must contain one uppercase letter.");
      return false;
    }

    setValidationMessage(""); // Clear message if valid
    return true;
  };

  useEffect(() => {
    setValidationMessage(""); // Clear validation when switching modes
  }, [action]);
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRemember = localStorage.getItem("rememberMe") === "true";
    if (savedRemember && savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(savedRemember);
    }
  }, []);
  const handleClassGSMClick = () => {
    if (!validateAction("signup")) return; // Validate before proceeding

    const confirmNavigation = window.confirm(
      "Are you sure you want to navigate to GSM?"
    );
    if (!confirmNavigation) return; // Stop if the user cancels

    setUser({ name, email, password });
    navigate("/gsm");
  };

  const handleClassUrlClick = () => {
    if (!validateAction(action)) return; // Validate before proceeding

    navigate(`/classurl/${name}/${email}/${password}`);
  };

  const handleLoginClick = () => {
    if (action === "Sign Up") {
      setAction("Login");
      setName(""); // Reset name field when switching
      return;
    }

    if (!validateAction("login")) return;
    const isChecked = true;
    localStorage.setItem("isChecked", JSON.stringify(isChecked));
    navigate("/dashboard", {
      state: { name, email, password, isSignup: false },
    });

    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
  };
  const handleSignupClick = () => {
    if (action === "Login") {
      setAction("Sign Up");
      setName("");
      setEmail("");
      setPassword("");
      return;
    }

    if (!validateAction("signup")) return;

    navigate("/dashboard", {
      state: { name, email, password, isSignup: true },
    });
  };
  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    alert(`Password reset link sent to ${email}.`);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      {validationMessage && (
        <div className="validation-message">{validationMessage}</div>
      )}

      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="user" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                const newName = e.target.value.replace(!/^[a-zA-Z ]+$/i, "");
                setName(newName);
              }}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="email" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            maxLength={35}
            onChange={(e) => {
              const email = e.target.value.replace(
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{4}$/i,
                ""
              );
              setEmail(email);
            }}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="password" />
          <input
            type="password"
            placeholder="Password"
            minLength={8}
            value={password}
            onChange={(e) => {
              const password = e.target.value.replace(
                !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,20}$/i,
                ""
              );
              setPassword(password);
            }}
          />
        </div>
      </div>

      <div className="inputs">
        {action === "ClassUrl" && (
          <div className="input">
            <img src={user_icon} alt="user" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                const newName = e.target.value.replace(!/^[a-zA-Z ]+$/i, "");
                setName(newName);
              }}
            />
          </div>
        )}
      </div>

      {action === "Login" && (
        <>
          <div className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password? <span>Click Here!</span>
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />{" "}
            Remember Me
          </div>
        </>
      )}
      <div className="submit-container">
        <div
          className={
            action === "Login" || action === "ClassUrl"
              ? "submit gray"
              : "submit"
          }
          onClick={() => handleSignupClick()}
        >
          Sign Up
        </div>
        <div
          className={
            action === "Sign Up" || action === "ClassUrl"
              ? "submit gray"
              : "submit"
          }
          onClick={() => handleLoginClick()}
        >
          Login
        </div>

        <div
          className={action === "ClassUrl" ? "submit" : "submit gray"}
          onClick={() => handleClassUrlClick()}
        >
          ClassUrl
        </div>

        <div
          className={action === "ClassUrl" ? "submit" : "submit gray"}
          onClick={() => handleClassGSMClick()}
        >
          GSM
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
