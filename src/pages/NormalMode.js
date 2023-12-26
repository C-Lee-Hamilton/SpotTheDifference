import React, { useState, useEffect, useRef } from "react";
import Grid from "../components/grid";
import Coordinates from "../components/coordinates";
import "../styles/normalMode.css";
import WinSound from "../media/sounds/win.mp3";
import NormMusic from "../media/sounds/NormalMusic.mp3";
function SpotTheDiff({ soundVolume, musicVolume }) {
  const [buttonStates, setButtonStates] = useState(Array(100).fill(false));
  const [clickedButtons, setClickedButtons] = useState([]);
  const [winning, setWinning] = useState(false);
  const [leftImg, setLeftImg] = useState(0);
  const [rightImg, setRightImg] = useState(1);
  const [click, setClick] = useState(true);
  const imageSrc1 = Coordinates[leftImg].src;
  const imageSrc2 = Coordinates[rightImg].src;
  const [winAudio] = useState(new Audio(WinSound));
  const audioRef = useRef(new Audio(NormMusic));
  winAudio.volume = soundVolume;

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
    const winningCombination = Coordinates[leftImg].solution;

    if (
      clickedButtons.length === winningCombination.length &&
      clickedButtons.every((btnIndex) => winningCombination.includes(btnIndex))
    ) {
      setWinning(true);
      winAudio.play();
    }
  }, [clickedButtons]);

  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = () => {
      if (musicVolume !== "0") {
        audio.loop = true;

        const playPromise = audio.play();

        playPromise
          .then(() => {
            audio.volume = musicVolume;
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    };

    const pauseAudio = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    const handleCanPlay = () => {
      playAudio();
      audio.removeEventListener("canplay", handleCanPlay);
    };

    audio.addEventListener("canplay", handleCanPlay);

    if (musicVolume === "0") {
      pauseAudio();
    } else {
      // If audio is already loaded, play it; otherwise, it will be played once the canplay event is triggered
      if (audio.readyState >= 2) {
        playAudio();
      }
    }

    return () => {
      pauseAudio();
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [musicVolume]);
  return (
    <div onClick={clicker}>
      <div className="picture-frame">
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
        <button onClick={NextButton} className="next-button">
          NEXT
        </button>
      )}
      {click && <h1 className="footer">Click Anywhere to begin</h1>}
    </div>
  );
}

export default SpotTheDiff;
