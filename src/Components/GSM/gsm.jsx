import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import "./gsm.css";

const GSM = () => {
  const { user, setUser } = useContext(AuthContext);
  const [apiUsers, setApiUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 30;
  const [totalUsers, setTotalUsers] = useState(0);

  // ✅ loader sirf API calls ke liye
  const [pageLoading, setPageLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate();

  // ✅ Users fetch karna
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setPageLoading(true); // start loader
        const skip = (currentPage - 1) * usersPerPage;
        const res = await fetch(
          `https://dummyjson.com/users?limit=${usersPerPage}&skip=${skip}`
        );
        const data = await res.json();
        setApiUsers(data.users || []);
        setTotalUsers(data.total || 0);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setPageLoading(false); // stop loader
      }
    };

    fetchUsers();
  }, [currentPage]);

  // ✅ Logged-in user set karna
  useEffect(() => {
    if (user) {
      setLoggedUser(user);
    } else {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setLoggedUser(parsed);
      }
    }
  }, [user, setUser]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // ✅ Edit handler
  const handleUserClick = (u) => {
    const formattedUser = {
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      phone: u.phone,
      file: u.image,
      isApiUser: true,
    };
    navigate("/add-user", { state: { user: formattedUser } });
  };

  // ✅ Delete confirm
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  // ✅ Delete API call
  const handleDeleteConfirmed = async () => {
    if (!userToDelete) return;

    try {
      setPageLoading(true); // start loader
      const res = await fetch(
        `https://dummyjson.com/users/${userToDelete.id}`,
        { method: "DELETE" }
      );
      const deletedUser = await res.json();
      console.log("Deleted Response:", deletedUser);

      setApiUsers(apiUsers.filter((u) => u.id !== userToDelete.id));
      setShowModal(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setPageLoading(false); // stop loader
    }
  };

  // ✅ Detail handler → koi loader nahi
  const handleDetailClick = (u) => {
    navigate(`/user/${u.id}`, { state: { user: u } });
  };

  return (
    <div className="gsm-container">
      <h2 className="title">📱 GSM Screen</h2>

      {/* ✅ Loader overlay sirf API calls ke time */}
      {pageLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {loggedUser && (
        <div className="login-card">
          <h3>🔑 Logged In User</h3>
          <p>
            <strong>ID:</strong> {loggedUser.id || "N/A"}
          </p>
          <p>
            <strong>Username:</strong>{" "}
            {loggedUser.username || loggedUser.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {loggedUser.email || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {loggedUser.gender || "N/A"}
          </p>
        </div>
      )}

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
            <div className="user-actions">
              <button className="add-btn" onClick={() => handleUserClick(u)}>
                ➕ Edit
              </button>
              <button className="delete-btn" onClick={() => confirmDelete(u)}>
                ❌ Delete
              </button>
              <button
                className="detail-btn"
                onClick={() => handleDetailClick(u)}
              >
                📋 Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>

      {/* ✅ Delete modal */}
      {showModal && userToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>⚠ Delete Confirmation</h3>
            <p>
              Are you sure you want to delete
              <b>
                {" "}
                {userToDelete.firstName} {userToDelete.lastName}
              </b>
              ?
            </p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleDeleteConfirmed}>
                Yes, Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GSM;
