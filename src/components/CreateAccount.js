import axios from "axios";
import { useState } from "react";

function CreateAccount({
  registerSetVis,
  setRegisterSuccess,
  registerSuccess,
}) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Users/register",
        {
          email: email,
          password: newPassword,
          username: newUsername,
        }
      );
      console.log(response.data.user);
      response.data.user === undefined
        ? setRegisterSuccess("try again")
        : setRegisterSuccess("success");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      Create Account
      <input
        className="login-inputs"
        type="text"
        placeholder="Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <input
        className="login-inputs"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-inputs"
        type="password"
        placeholder="Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="login-popup-button" onClick={handleRegister}>
        Register
      </button>
      <button className="login-popup-button" onClick={registerSetVis}>
        Go Back
      </button>
      {registerSuccess}
    </div>
  );
}

export default CreateAccount;
