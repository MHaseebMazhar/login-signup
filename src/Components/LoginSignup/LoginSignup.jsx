import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    const savedRemember = localStorage.getItem("rememberMe") === "true";
    if (savedRemember && savedUser && savedPassword) {
      setUsername(savedUser);
      setPassword(savedPassword);
      setRememberMe(savedRemember);
    }
  }, []);

  // ✅ API login
  const handleLoginClick = async () => {
    if (action === "Sign Up") {
      setAction("Login");
      setName("");
      setEmail("");
      setPassword("");
      return;
    }

    if (!username) {
      setValidationMessage("Please enter your username.");
      return;
    }
    if (!password) {
      setValidationMessage("Please enter your password.");
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));

        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }

        navigate("/dashboard", { state: { username, isSignup: false } });
      } else {
        setValidationMessage(data.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setValidationMessage("Something went wrong. Please try again.");
    }
  };

  // ✅ Signup
  const handleSignupClick = () => {
    if (action === "Login") {
      setAction("Sign Up");
      setUsername("");
      setPassword("");
      return;
    }

    if (!name || !email || !password) {
      setValidationMessage("Please fill all fields.");
      return;
    }

    navigate("/dashboard", { state: { name, email, password, isSignup: true } });
  };

  // ✅ ClassUrl
  const handleClassUrlClick = () => {
    if (!username && !name) {
      setValidationMessage("Enter name/username first.");
      return;
    }
    navigate(`/classurl/${username || name}/${email || "no-email"}/${password}`);
  };

  // ✅ GSM
  const handleClassGSMClick = () => {
    if (!username && !name) {
      setValidationMessage("Enter name/username first.");
      return;
    }
    const confirmNavigation = window.confirm("Are you sure you want to navigate to GSM?");
    if (!confirmNavigation) return;
    setUser({ name: name || username, email, password });
    navigate("/gsm");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {validationMessage && <div className="validation-message">{validationMessage}</div>}

      <div className="inputs">
        {action === "Sign Up" ? (
          <>
            <div className="input">
              <img src={user_icon} alt="user" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={email_icon} alt="email" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={password_icon} alt="password" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="input">
              <img src={user_icon} alt="user" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={password_icon} alt="password" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {action === "Login" && (
        <div className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />{" "}
          Remember Me
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" || action === "ClassUrl" ? "submit gray" : "submit"}
          onClick={handleSignupClick}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" || action === "ClassUrl" ? "submit gray" : "submit"}
          onClick={handleLoginClick}
        >
          Login
        </div>
        <div
          className={action === "ClassUrl" ? "submit" : "submit gray"}
          onClick={handleClassUrlClick}
        >
          ClassUrl
        </div>
        <div
          className={action === "ClassUrl" ? "submit" : "submit gray"}
          onClick={handleClassGSMClick}
        >
          GSM
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
