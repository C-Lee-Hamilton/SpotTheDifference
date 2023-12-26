import React, { useState, useEffect } from "react";
import "../styles/settingsMode.css";
import ColorSelector from "../components/colorSelector";

function SettingsMode({
  setBackgroundColor,
  setSoundVolume,
  setMusicVolume,
  soundVolume,
  musicVolume,
}) {
  const [credits, setCredits] = useState(false);

  const selectCredit = () => {
    setCredits(!credits);
  };
  const [rangeValue1, setRangeValue1] = useState(soundVolume);
  const [rangeValue2, setRangeValue2] = useState(musicVolume);
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
          <h1>Settings</h1>
          Sound Effects&nbsp;
          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            value={rangeValue1}
            onChange={handleRangeChange}
          />
          <br />
          <br />
          Music&nbsp;
          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            value={rangeValue2}
            onChange={handleRangeChange2}
          />
          <br />
          <br />
          <ColorSelector setBackgroundColor={setBackgroundColor} />
          <br />
          <button onClick={selectCredit}>MUSIC CREDITS</button>
        </div>
      )}
      {credits && (
        <div>
          <h1>Music Credits</h1>
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
          </p>
          <button onClick={selectCredit}>Go Back</button>
        </div>
      )}
    </div>
  );
}

export default SettingsMode;