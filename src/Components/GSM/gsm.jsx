// src/pages/GSM/GSM.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import "./gsm.css";

const GSM = () => {
  const { user } = useContext(AuthContext); // Login API से मिला डेटा
  const [apiUsers, setApiUsers] = useState([]);

  useEffect(() => {
    // DummyJSON Users API call
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setApiUsers(data.users || []))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div className="gsm-container">
      <h2 className="title">📱 GSM Screen</h2>

      {/* ✅ Login API Data Card */}
      {user && (
        <div className="login-card">
          <h3>🔑 Login API Data</h3>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Access Token:</strong>{" "}
            {user.token ? user.token.substring(0, 25) + "..." : "N/A"}
          </p>
          <p>
            <strong>Refresh Token:</strong>{" "}
            {user.refreshToken ? user.refreshToken.substring(0, 25) + "..." : "N/A"}
          </p>
        </div>
      )}

      {/* ✅ DummyJSON Users Table */}
      <h3 className="table-title">👥 All Users from API</h3>
      {apiUsers.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {apiUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  <img
                    src={u.image}
                    alt={u.firstName}
                    className="user-photo"
                  />
                </td>
                <td>
                  {u.firstName} {u.lastName}
                </td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default GSM;
