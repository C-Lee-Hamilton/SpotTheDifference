import React, { useState } from "react";
import "../styles/settingsMode.css";
import PasswordChange from "../components/pwChange";
import { HuePicker } from "react-color";

function SettingsMode({
  setBackgroundColor,
  backgroundColor,
  setSoundVolume,
  setMusicVolume,
  soundVolume,
  musicVolume,
  rangeValue1,
  rangeValue2,
  setRangeValue1,
  setRangeValue2,
  token,
  handleLogout,
  bright,
  setBright,
}) {
  const [credits, setCredits] = useState(false);
  const [changer, setChanger] = useState(false);
  const handleBrightnessChange = (event) => {
    setBright(parseFloat(event.target.value));
  };
  const selectCredit = () => {
    setCredits(!credits);
  };
  const selectChange = () => {
    setChanger(!changer);
  };

  const handleRangeChange = (event) => {
    const newValue = event.target.value;
    setRangeValue1(newValue);
    setSoundVolume(newValue);
  };
  const handleRangeChange2 = (event) => {
    const newValue = event.target.value;
    setRangeValue2(newValue);
    setMusicVolume(newValue);
  };

  const resetButton = () => {
    setRangeValue1(0.5);
    setRangeValue2(0.5);
    setSoundVolume(0.5);
    setMusicVolume(0.5);
    setBackgroundColor("black");
    setBright(1);
  };

  return (
    <div className="settingsBody">
      {!credits && (
        <div>
          <h1 className="settings-h1">Settings</h1>
          <h2 className="settings-h2">Sound Effects</h2>
          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            value={rangeValue1}
            onChange={handleRangeChange}
          />
          <h2 className="settings-h2">Music</h2>
          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            value={rangeValue2}
            onChange={handleRangeChange2}
          />
          <h2 className="settings-h2">Brightness</h2>
          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            value={bright}
            onChange={handleBrightnessChange}
          />
          <h2 className="settings-h2">Background Color</h2>
          <HuePicker
            color={backgroundColor}
            onChange={(color) => setBackgroundColor(color.hex)}
            className="color-picker"
            width={180}
          />
          <button onClick={resetButton}>Reset All</button>
          <button onClick={selectCredit}>MUSIC AND ICONS CREDITS</button>
          <br />
          {token !== "" && (
            <div>
              <button onClick={selectChange}>Change Password</button>
              <br />
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      )}
      {credits && (
        <div className="credits-page">
          <h1>Music and Icons Credits</h1>
          <p>
            Expert Mode Music
            <br />
            Music from #Uppbeat (free for Creators!):
            <br />
            https://uppbeat.io/t/kevin-macleod/cyborg-ninja
            <br />
            License code: UB6U6HZFCL4WIAKZ
            <br />
            <br />
            Normal Mode Music
            <br />
            Music from #Uppbeat (free for Creators!):
            <br />
            https://uppbeat.io/t/kevin-macleod/itty-bitty-8-bit
            <br />
            License code: OINCLFWEZBDKHJAS
            <br />
            <br />
            Sound effects provided by Pixabay
            <br />
            icons provided by Flaticon
            <br />
            UIcons by <a href="https://www.flaticon.com/uicons">Flaticon</a>
          </p>
          <button onClick={selectCredit}>Go Back</button>
        </div>
      )}
      {changer && <PasswordChange token={token} selectChange={selectChange} />}
    </div>
  );
}

export default SettingsMode;
