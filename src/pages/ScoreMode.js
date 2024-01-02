import React, { useState, useEffect } from "react";
import "../styles/scoreMode.css";
import badge from "../media/images/59.png";
function ScoreMode({ score, highscore }) {
  const [ATExpTab, setATExpTab] = useState(false);
  const [ATNormTab, setATNormTab] = useState(true);
  const [normClass, setNormClass] = useState("button-on");
  const [expClass, setExpClass] = useState("button-off");
  const normButton = () => {
    if (ATExpTab) {
      setATNormTab(true);
      setATExpTab(false);
      setNormClass("button-off");
      setExpClass("button-on");
    } else {
    }
  };
  const expButton = () => {
    if (ATNormTab) {
      setATNormTab(false);
      setATExpTab(true);
      setNormClass("button-on");
      setExpClass("button-off");
    } else {
    }
  };
  return (
    <div className="scoreBody">
      <h1 className="header-leader">Leaderboards</h1>

      <div className="columnsContainer">
        {/* All Time Column */}
        <div className="column">
          <h2>All Time</h2>
          <button className={normClass} onClick={normButton}>
            Normal Mode
          </button>
          <button className={expClass} onClick={expButton}>
            Expert Mode
          </button>
          {ATNormTab && (
            <div className="ATNormScore">
              <ul>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
              </ul>
            </div>
          )}
          {ATExpTab && (
            <div className="ATExpScore">
              <ul>
                <li>b</li>
                <li>b</li>
                <li>b</li>
                <li>b</li>
                <li>b</li>
                <li>b</li>
                <li>b</li>
                <li>b</li>
                <li>b</li>
                <li>b</li>
              </ul>
            </div>
          )}
        </div>

        {/* Personal Column */}
        <div className="column">
          <h2>Personal</h2>

          <div>
            <h3>Normal Mode</h3>
            {score}
          </div>
          <div>
            <h3>Expert Mode</h3>
            {highscore}
          </div>
          <h3 className="badges-header">Badges</h3>
          <div className="badges">
            <img className="badge" src={badge} />
            <img className="badge" src={badge} />
            <img className="badge" src={badge} />
            <img className="badge" src={badge} />
            <img className="badge" src={badge} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreMode;
