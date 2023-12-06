import React, { useState, useEffect } from "react";
import Grid from "../components/grid";
import samplePic1 from "../media/images/251.png";
import samplePic2 from "../media/images/252.png";

function SpotTheDiff() {
  const [buttonStates, setButtonStates] = useState(Array(100).fill(false));
  const [clickedButtons, setClickedButtons] = useState([]);
  const [winning, setWinning] = useState(false);

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
  };

  useEffect(() => {
    // Check for a specific winning combination (e.g., buttons 1, 2, and 3)
    const winningCombination = [1, 2, 3];
    if (
      clickedButtons.length === winningCombination.length &&
      clickedButtons.every((btnIndex) => winningCombination.includes(btnIndex))
    ) {
      console.log("You win!");

      // Set the winning state to trigger the animation
      setWinning(true);
    }
  }, [clickedButtons]);

  return (
    <div>
      <div className="pictureFrame">
        <img className="img1" src={samplePic1} alt="" />
        <img className="img2" src={samplePic2} alt="" />
        <div className="grid-container">
          <div className="grid-box1">
            <Grid
              buttonStates={buttonStates}
              handleButtonClick={handleButtonClick}
              winning={winning}
            />
          </div>
          {/* Second set of buttons */}
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
        <button onClick={NextButton} className="NextButton">
          NEXT
        </button>
      )}
    </div>
  );
}

export default SpotTheDiff;
