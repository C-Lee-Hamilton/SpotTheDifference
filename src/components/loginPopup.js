import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateAccount from "./CreateAccount";
function PopUp({
  loginClickPopup,
  setGreeting,
  setScore,

  setHighscore,

  setToken,
  token,
}) {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const registerSetVis = () => {
    setRegister(!register);
    setLogin(!login);
    setRegisterSuccess("");
  };
  useEffect(() => {
    console.log("Updated Token:", token);
  }, [token]);
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/Auth/login", {
        username: email,
        password: password,
      });

      if (response.data.success) {
        console.log("Login successful");
        console.log(response.data.user.username);
        console.log("JWT Token:", response.data.token);

        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        console.log(token);
        setScore(response.data.user.score);
        setHighscore(response.data.user.highscore);

        setGreeting("Welcome Back" + " " + response.data.user.username);
        loginClickPopup();
      } else {
        console.log("Login failed:", response.data.message);
        // Handle login failure
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-popup">
      {login && (
        <div>
          <input
            type="text"
            placeholder="email"
            className="login-inputs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="login-inputs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-forgot">Forgot Password?</button>
          <button onClick={handleLogin} className="login-popup-button">
            Login
          </button>
          <button onClick={registerSetVis} className="login-popup-button">
            Create Account
          </button>
          <button onClick={loginClickPopup} className="login-popup-button">
            Cancel
          </button>
        </div>
      )}
      {register && (
        <CreateAccount
          registerSetVis={registerSetVis}
          setRegisterSuccess={setRegisterSuccess}
          registerSuccess={registerSuccess}
        />
      )}
    </div>
  );
}

export default PopUp;
