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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="loading-container">
        <p>❌ User not found</p>
      </div>
    );
  }

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

        {/* Profile Photo */}
        <motion.img
          src={safe(user?.image, "https://via.placeholder.com/150")}
          alt={safe(user?.firstName)}
          className="detail-photo"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        <h3 className="user-name">
          {safe(user?.firstName)} {safe(user?.lastName, "")}
        </h3>

        {/* Badges */}
        <div className="info-badges">
          <span className="badge blue">🎂 {safe(user?.age, "--")} yrs</span>
          <span className="badge green">⚧ {safe(user?.gender, "--")}</span>
          <span className="badge red">🩸 {safe(user?.bloodGroup, "--")}</span>
        </div>

        {/* Info Grid */}
        <div className="info-grid">
          {/* Email full width */}
          <div className="full-width">
            <Mail size={18} /> <b>Email:</b> {safe(user?.email)}
          </div>

          {/* Rest 2-column layout */}
          <div>
            <Phone size={18} /> <b>Phone:</b> {safe(user?.phone)}
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
            <MapPin size={18} /> <b>Address:</b>
            {safe(user?.address?.address)}, {safe(user?.address?.city)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetail;
