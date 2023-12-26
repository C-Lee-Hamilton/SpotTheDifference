import "./App.css";
import SpotTheDiff from "./pages/NormalMode";
import ExpertMode from "./pages/ExpertMode";
import SettingsMode from "./pages/SettingsMode";
import { useState, useEffect } from "react";
import PopUp from "./components/loginPopup";
import Backarrow from "./media/images/icons/backarrow.png";
import Mute from "./media/images/icons/mute.png";
import Unmute from "./media/images/icons/unmute.png";
import axios from "axios";
import NormMusic from "./media/sounds/NormalMusic.mp3";
import ExpMusic from "./media/sounds/ExpertMusic.mp3";
import ButtonNoise from "./media/sounds/buttonClick.mp3";
import ModeNoise from "./media/sounds/ModeStart.mp3";
function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [greeting, setGreeting] = useState("Login here to track progress");
  const [loggedOut, setLoggedOut] = useState("");
  const [toggleNormal, setToggleNormal] = useState(false);
  const [toggleExp, setToggleExp] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(true);
  const [toggleSettings, setToggleSettings] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [normAudioPlaying, setNormAudioPlaying] = useState(false);
  const [expAudioPlaying, setExpAudioPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(".5");
  const [soundVolume, setSoundVolume] = useState(".5");
  const [muteButton, setMuteButton] = useState(Unmute);
  const [clickAudio] = useState(new Audio(ButtonNoise));
  const [clickMode] = useState(new Audio(ModeNoise));
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
    setNormAudioPlaying(true);
    clickModes();
  };
  const chooseExpert = () => {
    setToggleMenu(false);
    setToggleExp(true);
    setExpAudioPlaying(true);
    clickModes();
  };
  const chooseSettings = () => {
    setToggleMenu(false);
    setToggleSettings(true);
  };
  const backButton = () => {
    setToggleExp(false);
    setToggleNormal(false);
    setToggleSettings(false);
    setToggleMenu(true);
    setNormAudioPlaying(false);
    setExpAudioPlaying(false);
  };
  const selectMute = () => {
    if (soundVolume !== "0" && musicVolume !== 0) {
      setSoundVolume("0");
      setMusicVolume("0");
      setMuteButton(Mute);
      setNormAudioPlaying(false);
      setExpAudioPlaying(false);
    } else {
      setMuteButton(Unmute);
      setSoundVolume(".5");
      setMusicVolume(".5");
      if (toggleNormal) {
        setNormAudioPlaying(true);
      } else if (toggleExp) {
        setExpAudioPlaying(true);
      }
    }
  };

  useEffect(() => {
    const audio = new Audio(NormMusic);

    if (normAudioPlaying) {
      audio.loop = true;
      audio.play();
      audio.volume = musicVolume;
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [normAudioPlaying]);
  useEffect(() => {
    const audio = new Audio(ExpMusic);

    if (expAudioPlaying) {
      audio.loop = true;
      audio.play();
      audio.volume = musicVolume;
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [expAudioPlaying]);

  return (
    <div
      onClick={clickSound}
      style={{ backgroundColor: backgroundColor }}
      className="App"
    >
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
        <h1 className="mute-button-h1">
          <img
            src={muteButton}
            className="mute-button"
            onClick={selectMute}
          ></img>
        </h1>
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
              onClick={chooseSettings}
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
            <SpotTheDiff soundVolume={soundVolume} />
          </div>
        )}
        {toggleExp && (
          <div>
            <h1 className="header">Spot The Difference</h1>
            <h1 className="expert-banner">EXPERT</h1>
            <ExpertMode soundVolume={soundVolume} />
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
      </div>
      {loginPopup && (
        <PopUp loginClickPopup={loginClickPopup} setGreeting={setGreeting} />
      )}
    </div>
  );
}

export default App;
