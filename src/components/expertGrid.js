import React from "react";
import "../styles/expertMode.css";
import "../styles/normalMode.css";
function ExpertGrid({ buttonStates, handleButtonClick, winning }) {
  const numRows = 10;
  const numColumns = 10;

  const renderButtons = () => {
    const buttons = [];

    for (let row = 0; row < numRows; row++) {
      const rowButtons = [];

      for (let col = 0; col < numColumns; col++) {
        const index = row * numColumns + col;
        const isButtonSelected = buttonStates[index];

        rowButtons.push(
          <button
            key={index}
            className={`exp-grid-tile ${isButtonSelected ? "selected" : ""} ${
              winning ? "spin" : ""
            } `}
            onClick={() => handleButtonClick(index)}
          ></button>
        );
      }

      buttons.push(
        <div key={row} className="exp-grid-row">
          {rowButtons}
        </div>
      );
    }

    return buttons;
  };

  return <div className="grid">{renderButtons()}</div>;
}

export default ExpertGrid;
