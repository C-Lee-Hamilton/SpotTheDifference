import "./App.css";
import SpotTheDiff from "./pages/SpotTheDifference";
import ExpertMode from "./pages/ExpertMode";
import { useState, useEffect } from "react";
import PopUp from "./components/loginPopup";
function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [mode, setMode] = useState("expertButton");
  const [modeText, setModeText] = useState("Expert");
  const [toggleMode, setToggleMode] = useState(true);
  const [toggleExp, setToggleExp] = useState(!toggleMode);
  const switchMode = () => {
    modeText === "Expert" ? setModeText("Normal") : setModeText("Expert");
    mode === "expertButton"
      ? setMode("normalModeButton")
      : setMode("expertButton");
    setToggleMode(!toggleMode);
    setToggleExp(!toggleExp);
  };
  const loginClickPopup = () => {
    setLoginPopup(!loginPopup);
  };

  return (
    <div className="App">
      <div>
        <h1 className="expertMode">
          <button onClick={switchMode} className={mode}>
            {modeText}
          </button>
        </h1>

        {toggleMode && (
          <div>
            <h1 className="header">Spot The Difference</h1>
            <SpotTheDiff />
          </div>
        )}
        {toggleExp && (
          <div>
            <h1 className="header">Spot The Difference</h1>
            <h1 className="expertBanner">EXPERT</h1>
            <ExpertMode />
          </div>
        )}
      </div>
      {loginPopup && <PopUp loginClickPopup={loginClickPopup} />}
      <a onClick={loginClickPopup} className="login-button">
        Login here to track progress
      </a>
    </div>
  );
}

export default App;
