import React from "react";

function Grid({ buttonStates, handleButtonClick }) {
  const numRows = 5;
  const numColumns = 5;

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
            className={`button ${isButtonSelected ? "selected" : ""}`}
            onClick={() => handleButtonClick(index)}
          ></button>
        );
      }

      buttons.push(
        <div key={row} className="button-row">
          {rowButtons}
        </div>
      );
    }

    return buttons;
  };

  return <div className="">{renderButtons()}</div>;
}

export default Grid;