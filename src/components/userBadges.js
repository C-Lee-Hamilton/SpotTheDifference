import React, { useState } from "react";

const BadgeDisplay = ({ score, highscore, ATNormTab2, ATExpTab2 }) => {
  // const badgeAmount = Math.floor(score / 10);
  // const expBadgeAmount = Math.floor(highscore / 10);
  //this is just placeholder for testing
  const badgeAmount = 20;
  const expBadgeAmount = 3;

  return (
    <div>
      {ATNormTab2 && (
        <div>
          {Array.from({ length: badgeAmount }, (_, index) => (
            <img
              key={index}
              // src={imageList[index]}
              className="badge"
              src={require(`../media/images/badges/${index}.png`)}
              alt={`Badge ${index}`}
            />
          ))}
        </div>
      )}
      {ATExpTab2 && (
        <div>
          {Array.from({ length: expBadgeAmount }, (_, index) => (
            <img
              key={index}
              // src={imageList[index]}
              className="badge"
              src={require(`../media/images/expBadges/${index}.png`)}
              alt={`Badge ${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
