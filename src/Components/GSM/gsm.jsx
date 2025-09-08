import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import "./gsm.css";

const GSM = () => {
  const { user } = useContext(AuthContext);
  const [apiUsers, setApiUsers] = useState([]);

  useEffect(() => {
    // ✅ DummyJSON Users API
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setApiUsers(data.users || []))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div className="gsm-container">
      <h2 className="title">📱 GSM Screen</h2>

      {/* ✅ Login API Data */}
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
        </div>
      )}

      {/* ✅ Users Grid */}
      <h3 className="table-title">👥 All Users</h3>
      <div className="users-grid">
        {apiUsers.map((u) => (
          <div key={u.id} className="deal-card">
            <img src={u.image} alt={u.firstName} className="user-photo" />
            <p className="brand">@{u.username}</p>
            <h3>
              <b>
                {u.firstName} {u.lastName}
              </b>
            </h3>
            <div className="price">
              <span className="new-price">📧 {u.email}</span>
              <span className="old-price">📞 {u.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GSM;
