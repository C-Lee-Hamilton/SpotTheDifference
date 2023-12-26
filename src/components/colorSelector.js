import { useState } from "react";

function ColorSelector({ setBackgroundColor }) {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleContainerClick = (index, color) => {
    setSelectedCheckbox(index);
    setBackgroundColor(color);
  };

  const checkboxes = [
    { color: "white" },
    {
      color: "orange",
      boxShadow:
        "-2px -2px cyan, 2px 2px lime, -2px 2px hotpink, 2px -2px orange",
    },
    { color: "lightblue" },
    { color: "hotpink" },
    { color: "yellow" },
    { color: "limegreen" },
    { color: "black" },
  ];

  return (
    <div>
      Background Color
      <br />
      {checkboxes.map((checkbox, index) => (
        <label key={index} className="container">
          <input
            type="radio"
            checked={index === selectedCheckbox}
            onChange={() => {}}
          />
          <span
            onClick={() => handleContainerClick(index, checkbox.color)}
            className="checkmark"
            style={{
              backgroundColor: checkbox.color,
              boxShadow: index === selectedCheckbox ? checkbox.boxShadow : "",
            }}
          ></span>
        </label>
      ))}
    </div>
  );
}

export default ColorSelector;
