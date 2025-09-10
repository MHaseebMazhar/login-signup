import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Login"); // default login
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

 // ✅ Login
const handleLoginClick = async () => {
  if (!username || !password) {
    setValidationMessage("Please enter username & password.");
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
      localStorage.setItem("token", data.token);

      // ✅ Sirf user ka data store karna
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      if (rememberMe) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }

      setUser(userData);
      navigate("/dashboard", { state: { userData, isSignup: false } });
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
    if (!name || !email || !password) {
      setValidationMessage("Please fill all fields.");
      return;
    }

    const signupData = { name, email, password };

    localStorage.setItem("user", JSON.stringify(signupData));
    setUser(signupData);

    navigate("/dashboard", { state: { ...signupData, isSignup: true } });
  };

  // ✅ ClassUrl
  const handleClassUrlClick = () => {
    if (!username && !name) {
      setValidationMessage("Enter name/username first.");
      return;
    }
    navigate(
      `/classurl/${username || name}/${email || "no-email"}/${password}`
    );
  };

  // ✅ GSM
  const handleClassGSMClick = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
    navigate("/gsm");
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
          className={action === "Sign Up" ? "submit" : "submit gray"}
          onClick={handleSignupClick}
        >
          Sign Up
        </div>
        <div
          className={action === "Login" ? "submit" : "submit gray"}
          onClick={handleLoginClick}
        >
          Login
        </div>
        <div className="submit" onClick={handleClassUrlClick}>
          ClassUrl
        </div>
        <div className="submit" onClick={handleClassGSMClick}>
          GSM
        </div>
      </div>

      <div className="toggle-action">
        {action === "Login" ? (
          <p>
            Don’t have an account?{" "}
            <span onClick={() => setAction("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setAction("Login")}>Login</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
