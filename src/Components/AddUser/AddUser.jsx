import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddUser.css";
const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userNewValue, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    file: "",
  });
  const editingUser = location.state?.user || null; // Get user if editing
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState("");
  // Set name field when editing
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
      setFile(editingUser.file);
      // localStorage.removeItem("users");
    }
  }, [editingUser]);
  // Handle form submission
  const handleSubmit = () => {
    let storedUsers = localStorage.getItem("users");
    let parsedUsers = [];
    try {
      parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
      if (!Array.isArray(parsedUsers)) {
        throw new Error("Invalid users data in localStorage.");
      }
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      parsedUsers = []; // Reset to empty array if parsing fails
    }
    if (isEmailExiist(email)) {
      alert("Email already exisit :" + email);
    } else {
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }
    if (editingUser) {
      parsedUsers = parsedUsers.map((user) =>
        user.email === editingUser.email ? { name, email, phone,file } : user
      );
    } else {
      // Add new user
      parsedUsers.push({ name, email, phone,file });
    }
    
    // Save back to local storage
    localStorage.setItem("users", JSON.stringify(parsedUsers));
    localStorage.setItem("isChecked", JSON.stringify(false));
    navigate("/dashboard"); // Navigate back to dashboard
  };
  function handleChange(e) {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const imageUrl = URL.createObjectURL(uploadedFile);
      setFile(imageUrl);   
    }}
  function isEmailExiist(email) {
    const storedUsers =
      localStorage.getItem("users") !== null
        ? JSON.parse(localStorage.getItem("users"))
        : [];
    // Checking each object from 
    for (let i = 0; i < storedUsers.length; i++) {
      if (storedUsers[i]?.email === email) {
        return true; // return immediately when finding that the  exists
      }
    }
    return false; // doesn't exist
  }
  return (
    <div className="container">
      <h2>Add New User</h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={(userNewValue) => setName(userNewValue.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={(userNewValue) => setEmail(userNewValue.target.value)}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(userNewValue) => setPhone(userNewValue.target.value)}
          required
        />
        <input type="file" onChange={handleChange} />
        <img src={file} />
       
        <button className="Submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddUser;
