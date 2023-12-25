import "./App.css";
import SpotTheDiff from "./pages/NormalMode";
import ExpertMode from "./pages/ExpertMode";
import { useState } from "react";
import PopUp from "./components/loginPopup";
import Backarrow from "./media/images/backarrow.png";
import axios from "axios";
function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [greeting, setGreeting] = useState("Login here to track progress");
  const [loggedOut, setLoggedOut] = useState("");
  const [toggleNormal, setToggleNormal] = useState(false);
  const [toggleExp, setToggleExp] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(true);

  const handleLogout = async () => {
    try {
      // Make a request to the server's logout endpoint
      await axios.post("http://localhost:5000/Auth/logout");

      // Update the greeting state or perform any other actions
      setGreeting("Login here to track progress");
      setLoggedOut("Log Out Successful...");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const loginClickPopup = () => {
    setLoginPopup(!loginPopup);
  };
  const chooseNormal = () => {
    setToggleMenu(false);
    setToggleNormal(true);
  };
  const chooseExpert = () => {
    setToggleMenu(false);
    setToggleExp(true);
  };
  const backButton = () => {
    setToggleExp(false);
    setToggleNormal(false);
    setToggleMenu(true);
  };

  return (
    <div className="App">
      <div>
        {!toggleMenu && (
          <h1 className="back-button-h1">
            <img
              src={Backarrow}
              className="back-button"
              onClick={backButton}
            ></img>
          </h1>
        )}
        {toggleMenu && (
          <div className="main-menu">
            <h1 className="header">Spot The Difference</h1>
            <h2>Select Mode</h2>
            <button
              className="mode-button-left"
              style={{ backgroundColor: "cyan" }}
              onClick={chooseNormal}
            >
              Normal
            </button>
            <button
              className="mode-button-right"
              style={{ backgroundColor: "orange" }}
              onClick={chooseExpert}
            >
              Expert
            </button>
            <br />
            <button
              className="mode-button-left"
              style={{ backgroundColor: "lime" }}
            >
              Settings
            </button>
            <button
              className="mode-button-right"
              style={{ backgroundColor: "hotpink" }}
            >
              Highscores
            </button>
            <br />
            {greeting === "Login here to track progress" && (
              <button onClick={loginClickPopup} className="login-button">
                {loggedOut}
                <br />
                {greeting}
              </button>
            )}
            {greeting !== "Login here to track progress" && (
              <h1 className="greeting">
                {greeting}
                <br />
                <button onClick={handleLogout} className="logout-button">
                  Log Out
                </button>
              </h1>
            )}
          </div>
        )}
        {toggleNormal && (
          <div>
            <h1 className="header">Spot The Difference</h1>
            <SpotTheDiff />
          </div>
        )}
        {toggleExp && (
          <div>
            <h1 className="header">Spot The Difference</h1>
            <h1 className="expert-banner">EXPERT</h1>
            <ExpertMode />
          </div>
        )}
      </div>
      {loginPopup && (
        <PopUp loginClickPopup={loginClickPopup} setGreeting={setGreeting} />
      )}
    </div>
  );
}

export default App;
