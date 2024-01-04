import "./App.css";
import SpotTheDiff from "./pages/NormalMode";
import ExpertMode from "./pages/ExpertMode";
import SettingsMode from "./pages/SettingsMode";
import ScoreMode from "./pages/ScoreMode";
import { useState, useEffect, createContext, useContext } from "react";

import PopUp from "./components/loginPopup";
import Backarrow from "./media/images/icons/undo.png";
import Mute from "./media/images/icons/volume-slash.png";
import Unmute from "./media/images/icons/volume.png";
import axios from "axios";
import NormMusic from "./media/sounds/NormalMusic.mp3";
import ExpMusic from "./media/sounds/ExpertMusic.mp3";
import ButtonNoise from "./media/sounds/buttonClick.mp3";
import ModeNoise from "./media/sounds/ModeStart.mp3";
const AppContext = createContext();

// App component, providing state values through the context
const App = () => {
  const [toggleNormal, setToggleNormal] = useState(false);
  const [toggleExp, setToggleExp] = useState(false);

  return (
    <AppContext.Provider
      value={{
        toggleNormal,
        setToggleNormal,
        toggleExp,
        setToggleExp,
      }}
    >
      {/* Your app content goes here */}
      <ChildComponent />
    </AppContext.Provider>
  );
};

const ChildComponent = () => {
  const { toggleNormal, setToggleNormal, setToggleExp, toggleExp } =
    useContext(AppContext);
  const [loginPopup, setLoginPopup] = useState(false);
  const [greeting, setGreeting] = useState("Login here to track progress");

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

  const [rangeValue1, setRangeValue1] = useState(soundVolume);
  const [rangeValue2, setRangeValue2] = useState(musicVolume);

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
      setToken("");
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
      setRangeValue1(0.5);
      setRangeValue2(0.5);
      setMuteButton(Unmute);
      if (toggleNormal == true) {
        setNormAudioPlaying(true);
      } else if (toggleExp) {
        setExpAudioPlaying(true);
      }
    } else {
      setMuteButton(Mute);
      setRangeValue1(0);
      setRangeValue2(0);
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
              rangeValue1={rangeValue1}
              setRangeValue1={setRangeValue1}
              rangeValue2={rangeValue2}
              setRangeValue2={setRangeValue2}
              token={token}
              handleLogout={handleLogout}
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
      {/* {toggleMenu && (
        <div>
          {greeting !== "Login here to track progress" && (
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          )}
        </div>
      )} */}
    </div>
  );
};

export { App, AppContext };

//set up All Time High Scores in the backend
//access and modify All Time High Scores in the front end

//twemoji credits need to be done at some point, doc is in your png icon folder
//brain storm any additional features
//set up coordinates and run tests
