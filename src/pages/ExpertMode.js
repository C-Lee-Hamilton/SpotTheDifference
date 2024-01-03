import React, { useState, useEffect, useRef } from "react";
import PopupBadge from "../components/popupBadge";
import ExpertGrid from "../components/expertGrid";
import "../styles/expertMode.css";
import WinSound from "../media/sounds/win.mp3";
import ExpMusic from "../media/sounds/ExpertMusic.mp3";
import Coordinates from "../components/coordinates";
import axios from "axios";
function ExpertMode({
  soundVolume,
  musicVolume,
  highscore,
  setHighscore,
  token,
}) {
  const [starting, setStarting] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonStates, setButtonStates] = useState(Array(100).fill(false));
  const [clickedButtons, setClickedButtons] = useState([]);
  const [winning, setWinning] = useState(false);
  const [image, setImage] = useState(0);
  const [gridVis, setGridVis] = useState(false);
  const [timer, setTimer] = useState(15);
  const [winAudio] = useState(new Audio(WinSound));
  const audioRef = useRef(new Audio(ExpMusic));
  const imageSrc = Coordinates[image].src;
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
  const NextButton = () => {
    setWinning(false);
    setButtonStates(Array(100).fill(false));
    setClickedButtons([]);
    setImage((prevImage) => prevImage + 1);
    setTimer(15);
    setTimeout(() => {
      setImage((prevImage) => prevImage + 1);
    }, 5000);
  };
  const StartButton = () => {
    setStarting(false);
    setIsPlaying(true);
    setTimer(15);
    setTimeout(() => {
      setImage(image + 1);
    }, 15000);
  };
  const addScore = async (newScore) => {
    try {
      await axios.post(
        "http://localhost:5000/Auth/add-highscore",
        { highscore: newScore },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("highscore", JSON.stringify(newScore)); //store to local
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };

  useEffect(() => {
    //Check For Win
    const winningCombination = Coordinates[image].solution;

    if (
      clickedButtons.length === winningCombination.length &&
      clickedButtons.every((btnIndex) => winningCombination.includes(btnIndex))
    ) {
      setWinning(true);
      winAudio.play();
      const updatedScore = highscore + 1; // Update the score
      setHighscore(updatedScore);
      addScore(updatedScore);
    }
    if (image % 2 === 0) {
      setGridVis(false);
    } else {
      setGridVis(true);
    }
  }, [clickedButtons, image, winAudio]);

  useEffect(() => {
    if (timer === 15 && starting === false) {
      const countdownInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(countdownInterval);
          }
          return Math.max(prevTimer - 1, 0);
        });
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        setTimer(0);
      }, 15000);
    }
  }, [timer, starting]);
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
    <div>
      <div className="exp-picture-frame">
        {starting && (
          <div className="exp-instructions">
            <h4>Objectives:</h4>
            <h5>Memorize the first image before time runs out</h5>
            <h5>Find the differences in the second image</h5>
            <button className="exp-next-button" onClick={StartButton}>
              Start
            </button>
          </div>
        )}
        {starting && <img className="exp-img-blur" src={imageSrc} alt="" />}
        {isPlaying && <img className="exp-img" src={imageSrc} alt="" />}
        {gridVis && (
          <div className="exp-grid-container">
            <div className="exp-grid-box1">
              <ExpertGrid
                buttonStates={buttonStates}
                handleButtonClick={handleButtonClick}
                winning={winning}
              />
            </div>
          </div>
        )}
      </div>

      <div className="timer-label">Time Remaining: {timer}</div>

      {winning && (
        <div className="exp-instructions">
          <PopupBadge highscore={highscore} />
          <button className="exp-next-button" onClick={NextButton}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpertMode;
