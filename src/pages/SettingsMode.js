import React, { useState, useEffect } from "react";
import "../styles/settingsMode.css";
import ColorSelector from "../components/colorSelector";
import PasswordChange from "../components/pwChange";

function SettingsMode({
  setBackgroundColor,
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
}) {
  const [credits, setCredits] = useState(false);
  const [changer, setChanger] = useState(false);

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

  return (
    <div className="settingsBody">
      {!credits && (
        <div>
          <h1 className="settings-h1">Settings</h1>
          Sound Effects
          <br />
          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            value={rangeValue1}
            onChange={handleRangeChange}
          />
          <br />
          Music
          <br />
          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            value={rangeValue2}
            onChange={handleRangeChange2}
          />
          <br />
          <ColorSelector setBackgroundColor={setBackgroundColor} />
          <br />
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
