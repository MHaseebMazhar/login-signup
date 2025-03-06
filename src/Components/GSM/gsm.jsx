import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";

const GSM = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container"  style={{ textAlign: "center", padding: "20px" }}>
      <h2>GSM Screen</h2>
      <p>
        <strong>Name:</strong> {user?.name}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Password:</strong> {user?.password}
      </p>
    </div>
  );
};

export default GSM;
