import "./App.css";
import SpotTheDiff from "./pages/NormalMode";
import ExpertMode from "./pages/ExpertMode";
import { useState } from "react";
import PopUp from "./components/loginPopup";
import Backarrow from "./media/images/backarrow.png";
function App() {
  const [loginPopup, setLoginPopup] = useState(false);

  const [toggleNormal, setToggleNormal] = useState(false);
  const [toggleExp, setToggleExp] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(true);

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
            <button className="mode-button" onClick={chooseNormal}>
              Normal
            </button>
            <br />
            <button className="mode-button" onClick={chooseExpert}>
              Expert
            </button>
            <br />
            <button onClick={loginClickPopup} className="login-button">
              Login here to track progress
            </button>
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
      {loginPopup && <PopUp loginClickPopup={loginClickPopup} />}
    </div>
  );
}

export default App;
