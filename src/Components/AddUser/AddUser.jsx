import React, { useState,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./AddUser.css";
const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userNewValue, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const editingUser = location.state?.user || null; // Get user if editing

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


debugger;
  // Set name field when editing
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
    }else{
      setName("");
      setEmail("");
      setPhone("");
     // localStorage.removeItem("users");
    }
  }, [editingUser]);

 
  debugger;
  // Handle form submission

  const handleSubmit = () => {
    
    let storedUsers =  localStorage.getItem("users");
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
    if (editingUser) {
      parsedUsers = parsedUsers.map((user) =>
        user.email === editingUser.email ? { name, email, phone } : user
      );
    } else {
      // Add new user
      parsedUsers.push({ name, email, phone });
    }
    
    // Save back to local storage
    localStorage.setItem("users", JSON.stringify(parsedUsers));
    localStorage.setItem("isChecked", JSON.stringify(false));
     navigate("/dashboard"); // Navigate back to dashboard
  };

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

        <button className="Submit" onClick={handleSubmit}>Submit</button> 
      </form>
    </div>
  );
};

export default AddUser;

