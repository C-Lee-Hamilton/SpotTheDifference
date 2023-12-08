import React, { useState, useEffect } from "react";
import Grid from "../components/grid";
import samplePic1 from "../media/images/251.png";
import samplePic2 from "../media/images/252.png";
import Coordinates from "../components/coordinates";
console.log(Coordinates[0].src);
function SpotTheDiff() {
  const [buttonStates, setButtonStates] = useState(Array(100).fill(false));
  const [clickedButtons, setClickedButtons] = useState([]);
  const [winning, setWinning] = useState(false);
  const [leftImg, setLeftImg] = useState(0);
  const [rightImg, setRightImg] = useState(1);
  const [click, setClick] = useState(true);
  const imageSrc1 = Coordinates[leftImg].src;
  const imageSrc2 = Coordinates[rightImg].src;

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
    // Check for a specific winning combination (e.g., buttons 1, 2, and 3)
    const winningCombination = Coordinates[leftImg].solution;

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
    <div onClick={clicker}>
      <div className="pictureFrame">
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
      {click && <h1 className="footer">Click Anywhere to begin</h1>}
    </div>
  );
}

export default SpotTheDiff;
