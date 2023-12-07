import React, { useState, useEffect } from "react";
import Grid from "../components/grid";
import samplePic1 from "../media/images/251.png";
import samplePic2 from "../media/images/252.png";
import Coordinates from "../components/coordinates";
function ExpertMode() {
  const [starting, setStarting] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonStates, setButtonStates] = useState(Array(100).fill(false));
  const [clickedButtons, setClickedButtons] = useState([]);
  const [winning, setWinning] = useState(false);
  const [image, setImage] = useState(0);
  const [gridVis, setGridVis] = useState(false);

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
    setTimeout(() => {
      setImage((prevImage) => prevImage + 1);
    }, 5000);
  };
  const StartButton = () => {
    setStarting(false);
    setIsPlaying(true);
    setTimeout(() => {
      setImage(image + 1);
    }, 5000);
  };

  useEffect(() => {
    // Check for a specific winning combination (e.g., buttons 1, 2, and 3)
    const winningCombination = Coordinates[image].solution;

    if (
      clickedButtons.length === winningCombination.length &&
      clickedButtons.every((btnIndex) => winningCombination.includes(btnIndex))
    ) {
      console.log("You win!");

      // Set the winning state to trigger the animation
      setWinning(true);
    }
    if (image % 2 === 0) {
      setGridVis(false);
    } else {
      setGridVis(true);
    }
  }, [clickedButtons, image]);

  return (
    <div>
      <div className="pictureFrame">
        {starting && <img className="expert-img-blur" src={imageSrc} alt="" />}
        {isPlaying && <img className="expert-img" src={imageSrc} alt="" />}
        {gridVis && (
          <div className="grid-container">
            <div className="expert-grid-box1">
              <Grid
                buttonStates={buttonStates}
                handleButtonClick={handleButtonClick}
                winning={winning}
              />
            </div>
          </div>
        )}
      </div>

      {starting && (
        <button className="checkButton" onClick={StartButton}>
          Start
        </button>
      )}
      {winning && (
        <button className="checkButton" onClick={NextButton}>
          Next
        </button>
      )}
    </div>
  );
}

export default ExpertMode;
