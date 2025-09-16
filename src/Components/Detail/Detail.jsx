import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  User,
  Briefcase,
  MapPin,
  Ruler,
  Weight,
  Eye,
} from "lucide-react";
import "./Detail.css";
// Helper: exact age (years, months, days)
const calculateAge = (birthDateStr) => {
  if (!birthDateStr) return "Not Available";

  const birthDate = new Date(birthDateStr);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} yrs ${months} mon ${days} days`;
};

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetail();
  }, [id]);





  // Helper: safe fallback values
  const safe = (val, fallback = "Not Available") => val || fallback;

  return (
    <div className="detail-page">
     <motion.div
  className="detail-card"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Header */}
  <div className="detail-header">
    <button onClick={() => navigate(-1)} className="back-btn">
      ⬅ Back
    </button>
    <h2>👤 User Profile</h2>
  </div>

  {/* Loading inside card */}
  {loading ? (
    <div className="loading-container-card">
      
      
    </div>
  ) : !user ? (
    <p></p>
  ) : (
    <>
      {/* Profile Photo */}
      <motion.img
        src={safe(user?.image, "https://via.placeholder.com/150")}
        alt={safe(user?.firstName)}
        className="detail-photo"
        whileHover={{ scale: 1.05, rotate: 3 }}
        transition={{ type: "spring", stiffness: 200 }}
      />

      <h3 className="user-name">
        {safe(user?.firstName)} {safe(user?.lastName, "")}
      </h3>

      {/* Badges */}
    <div className="info-badges">
  <span className="badge blue">🎂 {calculateAge(user?.birthDate)}</span>
  <span className="badge green">⚧ {safe(user?.gender, "--")}</span>
  <span className="badge red">🩸 {safe(user?.bloodGroup, "--")}</span>
</div>


      {/* Info Grid */}
      <div className="info-grid">
        {/* Email full width */}
        <div className="full-width">
          <Mail size={18} /> <b>Email:</b>{" "}
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user?.email}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1f2937",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            {safe(user?.email)}
          </a>
        </div>

        {/* Rest 2-column layout */}
        <div>
          <Phone size={18} /> <b>Phone:</b>{" "}
          <a
            href={`https://wa.me/${user?.phone?.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1f2937",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            {safe(user?.phone)}
          </a>
        </div>

        <div>
          <User size={18} /> <b>Username:</b> {safe(user?.username)}
        </div>
        <div>
          <Calendar size={18} /> <b>Birth Date:</b> {safe(user?.birthDate)}
        </div>
        <div>
          <Ruler size={18} /> <b>Height:</b> {safe(user?.height)} cm
        </div>
        <div>
          <Weight size={18} /> <b>Weight:</b> {safe(user?.weight)} kg
        </div>
        <div>
          <Eye size={18} /> <b>Eye Color:</b> {safe(user?.eyeColor)}
        </div>
        <div>
          <Briefcase size={18} /> <b>Company:</b> {safe(user?.company?.name)}
        </div>
        <div>
          <MapPin size={18} /> <b>Address:</b>{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${user?.address?.address}, ${user?.address?.city}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1f2937",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            {safe(user?.address?.address)}, {safe(user?.address?.city)}
          </a>
        </div>
      </div>
    </>
  )}
</motion.div>

    </div>
  );
};

export default UserDetail;
