import { React, useState, useEffect } from "react";

const PasswordChange = ({ token, selectChange }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/Auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the JWT token here
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Password changed successfully
        console.log(data.message);
        setSuccess("Success");
      } else {
        // Password change failed
        console.error(data.message);
        setSuccess("try again");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="pwChange-popup">
      <input
        className="pwChange-inputs"
        type="password"
        placeholder="Old Password"
        name="oldPassword"
        value={oldPassword}
        onChange={handleChange}
      />
      <input
        className="pwChange-inputs"
        type="password"
        placeholder="New Password"
        name="newPassword"
        value={newPassword}
        onChange={handleChange}
      />
      <button className="pwChange-popup-button" onClick={handleSubmit}>
        Change Password
      </button>
      <button className="pwChange-popup-button" onClick={selectChange}>
        Go Back
      </button>
      <h3
        style={{
          marginBottom: "0px",
          marginTop: "-50px",
        }}
      >
        {success}
      </h3>
    </div>
  );
};

export default PasswordChange;
