import "./App.css";
import SpotTheDiff from "./pages/NormalMode";
import ExpertMode from "./pages/ExpertMode";
import SettingsMode from "./pages/SettingsMode";
import ScoreMode from "./pages/ScoreMode";
import { useState, useEffect } from "react";
import PopUp from "./components/loginPopup";
import Backarrow from "./media/images/icons/undo.png";
import Mute from "./media/images/icons/volume.png";
import Unmute from "./media/images/icons/volume-slash.png";
import axios from "axios";
import NormMusic from "./media/sounds/NormalMusic.mp3";
import ExpMusic from "./media/sounds/ExpertMusic.mp3";
import ButtonNoise from "./media/sounds/buttonClick.mp3";
import ModeNoise from "./media/sounds/ModeStart.mp3";

function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [greeting, setGreeting] = useState("Login here to track progress");

  const [toggleNormal, setToggleNormal] = useState(false);
  const [toggleExp, setToggleExp] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(true);
  const [toggleSettings, setToggleSettings] = useState(false);
  const [toggleScore, setToggleScore] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [normAudioPlaying, setNormAudioPlaying] = useState(false);
  const [expAudioPlaying, setExpAudioPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [muteButton, setMuteButton] = useState(Unmute);
  const [clickAudio] = useState(new Audio(ButtonNoise));
  const [clickMode] = useState(new Audio(ModeNoise));
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [token, setToken] = useState("");
  const clickSound = () => {
    clickAudio.play();
    clickAudio.volume = soundVolume;
  };
  const clickModes = () => {
    clickMode.play();
    clickMode.volume = soundVolume;
  };

  const handleLogout = async () => {
    try {
      // Make a request to the server's logout endpoint
      await axios.post("http://localhost:5000/Auth/logout");

      // Update the greeting state or perform any other actions
      setGreeting("Login here to track progress");
      // setLoggedOut("Log Out Successful...");
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

    clickModes();
  };
  const chooseExpert = () => {
    setToggleMenu(false);
    setToggleExp(true);

    clickModes();
  };
  const chooseSettings = () => {
    setToggleMenu(false);
    setToggleSettings(true);
  };
  const chooseScore = () => {
    setToggleScore(true);

    setToggleMenu(false);
  };
  const backButton = () => {
    setToggleExp(false);
    setToggleNormal(false);
    setToggleSettings(false);
    setToggleMenu(true);
    setToggleScore(false);
  };
  const selectMute = () => {
    if (muteButton === Mute) {
      setSoundVolume(0.5);
      setMusicVolume(0.5);
      setMuteButton(Unmute);
      if (toggleNormal == true) {
        setNormAudioPlaying(true);
      } else if (toggleExp) {
        setExpAudioPlaying(true);
      }
    } else {
      setMuteButton(Mute);
      setSoundVolume(0);
      setMusicVolume(0);
      setNormAudioPlaying(false);
      setExpAudioPlaying(false);
    }
  };

  return (
    <div
      onClick={clickSound}
      style={{ backgroundColor: backgroundColor }}
      className="App"
    >
      <div>
        <div className="tool-banner">
          {!toggleMenu && (
            <h1 className="back-button-h1">
              <img
                src={Backarrow}
                className="back-button"
                onClick={backButton}
              ></img>
            </h1>
          )}
          {greeting === "Login here to track progress" && (
            <button onClick={loginClickPopup} className="login-button">
              <br />
              {greeting}
            </button>
          )}
          {greeting !== "Login here to track progress" && (
            <h1 className="greeting">{greeting}</h1>
          )}
          <h1 className="mute-button-h1">
            <img
              src={muteButton}
              className="mute-button"
              onClick={selectMute}
            ></img>
          </h1>
        </div>

        {toggleMenu && (
          <div className="main-menu">
            <h1 className="header">Spot The Difference</h1>

            <button
              className="mode-button-left"
              style={{ backgroundColor: "cyan" }}
              onClick={chooseNormal}
            >
              Normal
              <br />
              <h1 className="smallText">Mode</h1>
            </button>
            <button
              className="mode-button-right"
              style={{ backgroundColor: "orange" }}
              onClick={chooseExpert}
            >
              Expert
              <br />
              <h1 className="smallText">Mode</h1>
            </button>
            <br />
            <button
              onClick={chooseSettings}
              className="mode-button-left"
              style={{ backgroundColor: "lime" }}
            >
              Settings
            </button>
            <button
              onClick={chooseScore}
              className="mode-button-right"
              style={{ backgroundColor: "hotpink" }}
            >
              Highscores
            </button>
            <br />
          </div>
        )}
        {toggleNormal && (
          <div>
            <h1 className="header">Spot The Difference</h1>
            <SpotTheDiff
              setScore={setScore}
              score={score}
              token={token}
              soundVolume={soundVolume}
              musicVolume={musicVolume}
            />
          </div>
        )}
        {toggleExp && (
          <div>
            <h1 className="header">Spot The Difference</h1>
            <h1 className="expert-banner">EXPERT</h1>
            <ExpertMode
              setHighscore={setHighscore}
              highscore={highscore}
              token={token}
              soundVolume={soundVolume}
              musicVolume={musicVolume}
            />
          </div>
        )}
        {toggleSettings && (
          <div>
            <h1 className="header">Spot The Difference</h1>

            <SettingsMode
              setBackgroundColor={setBackgroundColor}
              setSoundVolume={setSoundVolume}
              setMusicVolume={setMusicVolume}
              soundVolume={soundVolume}
              musicVolume={musicVolume}
            />
          </div>
        )}
        {toggleScore && (
          <div>
            <h1 className="header">Spot The Difference</h1>

            <ScoreMode score={score} highscore={highscore} />
          </div>
        )}
      </div>
      {loginPopup && (
        <PopUp
          setScore={setScore}
          setHighscore={setHighscore}
          loginClickPopup={loginClickPopup}
          setGreeting={setGreeting}
          setToken={setToken}
          token={token}
        />
      )}
      {greeting !== "Login here to track progress" && (
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      )}
    </div>
  );
}

export default App;
