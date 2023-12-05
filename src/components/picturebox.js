import React, { useState } from "react";
import Grid from "./grid";
import samplePic1 from "../media/images/13.png";
import samplePic2 from "../media/images/14.png";

function PictureBox() {
  const [buttonStates, setButtonStates] = useState(Array(25).fill(false));

  const handleButtonClick = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);
  };

  return (
    <div className="pictureBoxContainer">
      <div className="boxDiv">
        <img className="img1" src={samplePic1} alt="" />
        <img className="img2" src={samplePic2} alt="" />
        <div className="grid-container">
          <div className="grid-box1">
            <Grid
              buttonStates={buttonStates}
              handleButtonClick={handleButtonClick}
            />
          </div>
          {/* Second set of buttons */}
          <div className="grid-box2">
            <Grid
              buttonStates={buttonStates}
              handleButtonClick={handleButtonClick}
            />
          </div>
        </div>
      </div>

      <button className="checkNewButton">Check</button>
    </div>
  );
}

export default PictureBox;
