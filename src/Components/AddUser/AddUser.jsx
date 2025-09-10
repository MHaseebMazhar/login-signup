import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddUser.css";

const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingUser = location.state?.user || null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Agar edit mode hai toh old values load karo
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
      setFile(editingUser.file);
    }
  }, [editingUser]);

  // ✅ Image ko Base64 string me convert karna
  function handleChange(e) {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  }

  // ✅ Email duplicate check
  function isEmailExist(email) {
    const storedUsers =
      localStorage.getItem("users") !== null
        ? JSON.parse(localStorage.getItem("users"))
        : [];
    return storedUsers.some((user) => user.email === email);
  }

  // ✅ Submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let storedUsers = localStorage.getItem("users");
    let parsedUsers = [];
    try {
      parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
      if (!Array.isArray(parsedUsers)) throw new Error();
    } catch {
      parsedUsers = [];
    }

    if (!editingUser && isEmailExist(email)) {
      alert("Email already exists: " + email);
      setLoading(false);
      return;
    }

    // ✅ Local user object
    const userData = { name, email, phone, file };

   if (editingUser) {
  if (editingUser.isApiUser) {
    // ✅ API User ko update karo
    try {
      const res = await fetch(`https://dummyjson.com/users/${editingUser.id}`, {
        method: "PUT", // ya PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name.split(" ")[0] || editingUser.firstName,
          lastName: name.split(" ")[1] || editingUser.lastName,
          phone: phone || editingUser.phone,
          image: file || editingUser.file,
        }),
      });
      const apiResponse = await res.json();
      console.log("✅ API User Updated:", apiResponse);
    } catch (err) {
      console.error("❌ API Update Error:", err);
    }
  } else {
    // ✅ Local User update
    parsedUsers = parsedUsers.map((user) =>
      user.email === editingUser.email ? { ...user, ...userData } : user
    );
    localStorage.setItem("users", JSON.stringify(parsedUsers));
  }
} else {
  // ✅ New Local + API User add
  parsedUsers.push(userData);
  localStorage.setItem("users", JSON.stringify(parsedUsers));

  try {
    const res = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: name.split(" ")[0] || name,
        lastName: name.split(" ")[1] || "",
        email,
        phone,
        image: file || undefined,
      }),
    });
    const apiResponse = await res.json();
    console.log("✅ DummyJSON User Added:", apiResponse);
  } catch (err) {
    console.error("❌ API Error:", err);
  }
}


    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={!!editingUser}
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input type="file" onChange={handleChange} accept="image/*" />
        </div>

        {file && <img src={file} alt="Preview" className="preview-img" />}

        <button type="submit" className="Submit" disabled={loading}>
          { editingUser ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
