import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user detail:", err);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="user-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">⬅ Back</button>
      <h2>👤 User Details</h2>
      <img src={user.image} alt={user.firstName} className="detail-photo" />
      <h3>{user.firstName} {user.lastName}</h3>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Gender:</b> {user.gender}</p>
      <p><b>Age:</b> {user.age} years</p>
      <p><b>Birth Date:</b> {user.birthDate}</p>
      <p><b>Blood Group:</b> {user.bloodGroup}</p>
      <p><b>Height:</b> {user.height} cm</p>
      <p><b>Weight:</b> {user.weight} kg</p>
      <p><b>Eye Color:</b> {user.eyeColor}</p>
      <p><b>Company:</b> {user.company?.name}</p>
      <p><b>Address:</b> {user.address?.address}, {user.address?.city}</p>
    </div>
  );
};

export default UserDetail;
