import React, { useState, useEffect } from "react";
import Grid from "../components/grid";
import Coordinates from "../components/coordinates";
import "../styles/normalMode.css";
import WinSound from "../media/sounds/win.mp3";
function SpotTheDiff({ soundVolume }) {
  const [buttonStates, setButtonStates] = useState(Array(100).fill(false));
  const [clickedButtons, setClickedButtons] = useState([]);
  const [winning, setWinning] = useState(false);
  const [leftImg, setLeftImg] = useState(0);
  const [rightImg, setRightImg] = useState(1);
  const [click, setClick] = useState(true);
  const imageSrc1 = Coordinates[leftImg].src;
  const imageSrc2 = Coordinates[rightImg].src;
  const [winAudio] = useState(new Audio(WinSound));
  winAudio.volume = soundVolume;

  const handleButtonClick = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);

    setClickedButtons((prevClickedButtons) => {
      if (newButtonStates[index]) {
        return [...prevClickedButtons, index];
      } else {
        return prevClickedButtons.filter((btnIndex) => btnIndex !== index);
      }
    });
  };
  const clicker = () => {
    setClick(false);
  };
  const NextButton = () => {
    setWinning(false);
    setButtonStates(Array(100).fill(false));
    setClickedButtons([]);
    setLeftImg(leftImg + 2);
    setRightImg(rightImg + 2);
  };

  useEffect(() => {
    const winningCombination = Coordinates[leftImg].solution;

    if (
      clickedButtons.length === winningCombination.length &&
      clickedButtons.every((btnIndex) => winningCombination.includes(btnIndex))
    ) {
      setWinning(true);
      winAudio.play();
    }
  }, [clickedButtons]);

  return (
    <div onClick={clicker}>
      <div className="picture-frame">
        <img className="img1" src={imageSrc1} alt="" />
        <img className="img2" src={imageSrc2} alt="" />
        <div className="grid-container">
          <div className="grid-box1">
            <Grid
              buttonStates={buttonStates}
              handleButtonClick={handleButtonClick}
              winning={winning}
            />
          </div>
          <div className="grid-box2">
            <Grid
              buttonStates={buttonStates}
              handleButtonClick={handleButtonClick}
              winning={winning}
            />
          </div>
        </div>
      </div>
      {winning && (
        <button onClick={NextButton} className="next-button">
          NEXT
        </button>
      )}
      {click && <h1 className="footer">Click Anywhere to begin</h1>}
    </div>
  );
}

export default SpotTheDiff;
