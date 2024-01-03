import React from "react";
import "../styles/bounce.css";

const BouncingText = () => {
  const text = "New Badge!";

  // Split the text into an array of letters
  const letters = text.split("");

  return (
    <div>
      {letters.map((letter, index) => (
        <span key={index} className={`letter-${index}`}>
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
};

export default BouncingText;
