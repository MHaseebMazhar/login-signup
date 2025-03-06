import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Url = () => {
  const location = useLocation();
  const { name, email, password } = location.state || {};
  const params = useParams();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>URL Screen</h2>
      {params.name ? (
        <p>
          <strong>URL Name:</strong> {params.name}
        </p>
      ) : (
        <p>No URL name provided</p>
      )}
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

export default Url;
