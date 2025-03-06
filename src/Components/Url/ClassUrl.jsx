import React from "react";
import { useParams } from "react-router-dom";

const ClassUrl = () => {
  const { name, email, password } = useParams();

  return (
    <div className="container" style={{ textAlign: "center", padding: "20px" }}>
      <h2>Class URL Screen</h2>
      {name ? (
        <p>
          <strong>Name:</strong> {name}
        </p>
      ) : (
        <p>No name provided</p>
      )}
      {email ? (
        <p>
          <strong>Email:</strong> {email}
        </p>
      ) : (
        <p>No email provided</p>
      )}
      {password ? (
        <p>
          <strong>Password:</strong> {password}
        </p>
      ) : (
        <p>No password provided</p>
      )}
    </div>
  );
};

export default ClassUrl;
