import React, { useState, useEffect } from "react";
import ExpertGrid from "../components/expertGrid";
import "../styles/expertMode.css";

import Coordinates from "../components/coordinates";
function ExpertMode() {
  const [starting, setStarting] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonStates, setButtonStates] = useState(Array(100).fill(false));
  const [clickedButtons, setClickedButtons] = useState([]);
  const [winning, setWinning] = useState(false);
  const [image, setImage] = useState(0);
  const [gridVis, setGridVis] = useState(false);
  const [timer, setTimer] = useState(15);

  const imageSrc = Coordinates[image].src;

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
  const NextButton = () => {
    setWinning(false);
    setButtonStates(Array(100).fill(false));
    setClickedButtons([]);
    setImage((prevImage) => prevImage + 1);
    setTimer(15);
    setTimeout(() => {
      setImage((prevImage) => prevImage + 1);
    }, 5000);
  };
  const StartButton = () => {
    setStarting(false);
    setIsPlaying(true);
    setTimer(15);
    setTimeout(() => {
      setImage(image + 1);
    }, 15000);
  };

  useEffect(() => {
    //Check For Win
    const winningCombination = Coordinates[image].solution;

    if (
      clickedButtons.length === winningCombination.length &&
      clickedButtons.every((btnIndex) => winningCombination.includes(btnIndex))
    ) {
      setWinning(true);
    }
    if (image % 2 === 0) {
      setGridVis(false);
    } else {
      setGridVis(true);
    }
  }, [clickedButtons, image]);
  useEffect(() => {
    if (isPlaying) {
      const countdownInterval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [isPlaying, timer]);

  return (
    <div>
      <div className="exp-picture-frame">
        {starting && (
          <div className="exp-instructions">
            <h4>Objectives:</h4>
            <h5>Memorize the first image before time runs out</h5>
            <h5>Find the differences in the second image</h5>
            <h3>Click Start to Begin</h3>
          </div>
        )}
        {starting && <img className="exp-img-blur" src={imageSrc} alt="" />}
        {isPlaying && <img className="exp-img" src={imageSrc} alt="" />}
        {gridVis && (
          <div className="exp-grid-container">
            <div className="exp-grid-box1">
              <ExpertGrid
                buttonStates={buttonStates}
                handleButtonClick={handleButtonClick}
                winning={winning}
              />
            </div>
          </div>
        )}
      </div>

      <div className="timer-label">Time Remaining: {timer}</div>

      {starting && (
        <button className="exp-next-button" onClick={StartButton}>
          Start
        </button>
      )}
      {winning && (
        <button className="exp-next-button" onClick={NextButton}>
          Next
        </button>
      )}
    </div>
  );
}

export default ExpertMode;
