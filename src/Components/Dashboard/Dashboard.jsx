import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const loggedInUser = location.state || {};

  // ✅ Local + API dono load karna
  const loadUsers = async () => {
    // Local users
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];

    // API users
    let apiUsers = [];
    try {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      apiUsers = data.users || [];
    } catch (err) {
      console.error("API fetch error:", err);
    }

    // ✅ Merge dono lists (local users ko upar rakho)
    setUsers([...localUsers, ...apiUsers]);
  };

  useEffect(() => {
    loadUsers();
  }, [location]); // 👈 har navigate/update pe reload
  

  const handleSetClick = () => {
    navigate("/settings");
  };
  const handleMenuClick = () => {
    navigate("/menu");
  };
  const handleEditClick = (user) => {
    navigate("/add-user", { state: { user } });
  };
  const handleRemoveClick = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <button id="setting" onClick={handleSetClick}>
        Settings
      </button>
      <button id="Menu" onClick={handleMenuClick}>
        Menu
      </button>
      <h2 className="text">Dashboard</h2>
      <div>
        <p>
          <strong>Name:</strong> {loggedInUser.name}
        </p>
        <p>
          <strong>Email:</strong> {loggedInUser.email}
        </p>
        <p>
          <strong>Password:</strong> {loggedInUser.password}
        </p>
      </div>

      <button className="plus-button" onClick={() => navigate("/add-user")}>
        +
      </button>

      {users.length > 0 ? (
        <div>
          <h3>All Users</h3>
          <table border="1" style={{ margin: "0 auto", width: "80%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Remove</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    {user.name || `${user.firstName || ""} ${user.lastName || ""}`}
                  </td>
                  <td>{user.email || "N/A"}</td>
                  <td>{user.phone || "N/A"}</td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveClick(index)}
                    >
                      Remove
                    </button>
                  </td>
                  <td>
                    {user.file || user.image ? (
                      <img
                        src={user.file || user.image}
                        alt="User"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Dashboard;
