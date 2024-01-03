import { React, useContext } from "react";
import { AppContext } from "../App";
import Zero from "../media/images/badges/0.png";
import One from "../media/images/badges/1.png";
import Bounce from "./bounceText";
const imageList = [Zero, One];

const BadgePopDisplay = ({ score, highscore }) => {
  const { toggleNormal, toggleExp } = useContext(AppContext);
  const fakeScore = 20;
  const fakeHighscore = 20;
  // Check if the score is perfectly divisible by 10
  const isPerfectlyDivisible = fakeScore % 10 === 0;
  const expIsPerfectlyDivisible = fakeHighscore % 10 === 0;

  // Calculate the badge index based on the condition
  const badgeIndex = isPerfectlyDivisible ? fakeScore / 10 - 1 : null;
  const expBadgeIndex = expIsPerfectlyDivisible ? fakeHighscore / 10 - 1 : null;
  return (
    <div>
      {isPerfectlyDivisible && toggleNormal && badgeIndex !== null && (
        <div className="badge-container">
          <h1 className="badge-h1">
            <Bounce />
          </h1>
          <img
            src={require(`../media/images/badges/${badgeIndex}.png`)}
            className="badgespinner"
            alt={`Badge ${badgeIndex}`}
          />
        </div>
      )}
      {expIsPerfectlyDivisible && toggleExp && expBadgeIndex !== null && (
        <div className="badge-container2">
          <h1 className="badge-h12">
            <Bounce />
          </h1>
          <img
            src={require(`../media/images/expBadges/${expBadgeIndex}.png`)}
            className="badgespinner2"
            alt={`Badge ${expBadgeIndex}`}
          />
        </div>
      )}
    </div>
  );
};

export default BadgePopDisplay;
