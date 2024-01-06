import React, { useState, useEffect } from "react";
import "../styles/scoreMode.css";
import BadgeDisplay from "../components/userBadges";
function ScoreMode({ score, highscore }) {
  const [ATExpTab, setATExpTab] = useState(false);
  const [ATNormTab, setATNormTab] = useState(true);
  const [ATExpTab2, setATExpTab2] = useState(false);
  const [ATNormTab2, setATNormTab2] = useState(true);
  const [highscores, setHighscores] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchHighscores = async () => {
      try {
        const response = await fetch("http://localhost:5000/Auth/highscores");
        const data = await response.json();
        setHighscores(data);
      } catch (error) {
        console.error("Error fetching highscores:", error);
      }
    };

    fetchHighscores();
  }, []);
  useEffect(() => {
    const fetchNormHighscores = async () => {
      try {
        const response = await fetch("http://localhost:5000/Auth/scores");
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error("Error fetching highscores:", error);
      }
    };

    fetchNormHighscores();
  }, []);

  const normButton2 = () => {
    if (ATExpTab2) {
      setATNormTab2(true);
      setATExpTab2(false);
    } else {
    }
  };
  const expButton2 = () => {
    if (ATNormTab2) {
      setATNormTab2(false);
      setATExpTab2(true);
    } else {
    }
  };
  const normButton = () => {
    if (ATExpTab) {
      setATNormTab(true);
      setATExpTab(false);
    } else {
    }
  };
  const expButton = () => {
    if (ATNormTab) {
      setATNormTab(false);
      setATExpTab(true);
    } else {
    }
  };
  return (
    <div className="scoreBody">
      <h1 className="header-leader">High Scores</h1>

      <div className="columnsContainer">
        {/* All Time Column */}
        <div className="column">
          <h2>Leaderboards</h2>
          <button
            className={ATNormTab ? "button-off" : "button-on"}
            onClick={normButton}
          >
            Normal
          </button>
          <button
            className={ATExpTab ? "button-off" : "button-on"}
            onClick={expButton}
          >
            Expert
          </button>
          {ATNormTab && (
            <div className="ATNormScore">
              <ul>
                {scores.map((score) => (
                  <li key={score.userId}>
                    {score.username}: {score.score}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {ATExpTab && (
            <div className="ATExpScore">
              <ul>
                {highscores.map((highscore) => (
                  <li key={highscore.userId}>
                    {highscore.username}: {highscore.highscore}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Personal Column */}
        <div className="column">
          <h2>Personal</h2>

          <div className="personalScore">
            <h3>Normal Mode</h3>
            {score}
          </div>
          <div className="personalScore">
            <h3>Expert Mode</h3>
            {highscore}
          </div>
          <h3 className="badges-header">Badges</h3>

          <div className="badges">
            <BadgeDisplay
              ATNormTab2={ATNormTab2}
              ATExpTab2={ATExpTab2}
              highscore={highscore}
              score={score}
            />
          </div>
          <button
            className={ATNormTab2 ? "button-off2" : "button-on2"}
            onClick={normButton2}
            style={{ marginRight: "2px" }}
          >
            Normal
          </button>
          <button
            className={ATExpTab2 ? "button-off2" : "button-on2"}
            onClick={expButton2}
            style={{ marginLeft: "2px" }}
          >
            Expert
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreMode;
