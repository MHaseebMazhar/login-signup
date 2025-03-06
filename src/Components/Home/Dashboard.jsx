import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]);
  const loggedInUser = location.state || {};

  useEffect(() => {
    const isChecked = JSON.parse(localStorage.getItem("isChecked")) || false;
    if (!isChecked) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(storedUsers);
    }else{
    }
  }, []);
  const handleSetClick = () => {
    navigate("/setting");
  };
  const handleMenuClick = () => {
    navigate("/menu");

  }
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
         <button id="setting" onClick={handleSetClick}>Setting</button>
         <button id= "Menu" onClick={handleMenuClick}>Menu</button>
      <h2 className="text">Dashboard</h2>
       <div>
        <p><strong>Name:</strong> {loggedInUser.name}</p>
        <p><strong>Email:</strong> {loggedInUser.email}</p>
        <p><strong>Password:</strong> {loggedInUser.password}</p>
      </div>
      <button className="plus-button" onClick={() => navigate("/add-user")}>+</button>
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
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td><button class="edit-button" onClick={() => handleEditClick(user)}>Edit</button> </td>
                 <td> <button class="remove-button" onClick={() => handleRemoveClick(index)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
         <p></p>
      )}
    </div>
  );
};
export default Dashboard;
