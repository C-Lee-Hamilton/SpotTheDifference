import React, { useState } from "react";
import Grid from "../components/grid";
import samplePic1 from "../media/images/251.png";
import samplePic2 from "../media/images/252.png";

function ExpertMode() {
  const [buttonStates, setButtonStates] = useState(Array(25).fill(false));
  const [picture, setPicture] = useState(samplePic1);

  const handleButtonClick = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);
  };

  return (
    <div>
      <div className="pictureFrame">
        <img className="expert-img" src={picture} alt="" />

        <div className="grid-container">
          <div className="expert-grid-box1">
            <Grid
              buttonStates={buttonStates}
              handleButtonClick={handleButtonClick}
            />
          </div>
        </div>
      </div>

      <button className="checkButton">Check</button>
    </div>
  );
}

export default ExpertMode;
