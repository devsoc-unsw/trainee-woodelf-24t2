import { createContext, useEffect, useState } from "react";
import classes from "./PlayPage.module.scss";
import { useTimer } from "react-timer-hook";
import getDistance from "geolib/es/getPreciseDistance";
import { useLocation, useNavigate } from "react-router-dom";
import { Gamemodes } from "../../enums";
import Summary from "../../components/Summary/Summary";
import { GameContextTypes, Level } from "../../interfaces";
import { LatLngLiteral } from "leaflet";
import Map from "../../components/Map/Map";
import { RoundState } from "../../enums";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Panorama from "../../components/Panorama/Panorama";
import toast from "react-hot-toast";

export const GameContext = createContext<GameContextTypes>(
  {} as GameContextTypes,
);

const defaultNumRounds = 8;

function PlayPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [levelData, setLevelData] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState<Level>({} as Level);
  const [score, setScore] = useState(0);
  const [scoreGained, setScoreGained] = useState(0);
  const [round, setRound] = useState(1);
  const [maxRounds, _] = useState(defaultNumRounds);
  const [metresAway, setMetresAway] = useState(0);
  const [roundState, setRoundState] = useState<RoundState>(
    RoundState.ROUND_STARTED,
  );
  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(
    null,
  );
  const gamemode = state?.gamemode;
  const expiryTimestamp = new Date();
  const minutesToMilliseconds = (minutes: number): number => {
    return minutes * 60 * 1000;
  };

  const { seconds, minutes, restart, pause } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => nextLevel(true),
  });

  const restartTimer = () => {
    if (gamemode === Gamemodes.EXPLORATION) return;

    const newExpiryTimestamp = new Date(
      Date.now() +
        (gamemode === Gamemodes.TIMED_5MIN ? minutesToMilliseconds(5) : 0),
    );

    restart(newExpiryTimestamp);
  };

  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(1, "0");

  useEffect(() => {
    const fetchLevels = async () => {
      await fetch("/api/startGame?roundCount=8")
        .then((resp) => resp.json())
        .then((resp) => {
          setLevelData(resp);
          setCurrentLevel(resp[round - 1]);
          restartTimer();
        })
        .finally(() => setLoading(false))
        .catch((err) => console.log("Error fetching levels: ", err));
    };

    fetchLevels();
  }, []);

  function nextLevel(forceNext: Boolean = true) {
    if (roundState === RoundState.ROUND_STARTED) {
      if (markerPosition === null && !forceNext)
        return toast.error("Marker not placed", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      setRoundState(RoundState.IN_PROGRESS);
      pause();
      calculateScore();
    } else if (roundState === RoundState.IN_PROGRESS) {
      if (round === maxRounds) return endGame();
      setRoundState(RoundState.ROUND_STARTED);
      setRound(round + 1);
      resetRound();
    }
  }

  const endGame = () => {
    setRoundState(RoundState.END_SCREEN);
    const gameData = JSON.stringify({
      gameMode: gamemode,
      score: score,
    });
    fetch(`/api/endGame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: gameData,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.error("Error fetching level:", err);
      });
  };

  const resetRound = () => {
    setMarkerPosition(null);
    setCurrentLevel(levelData[round]);
    restartTimer();
  };

  const calculateScore = () => {
    if (markerPosition === null) return setScoreGained(0);
    const distAway = getDistance(
      {
        latitude: currentLevel.latitude,
        longitude: currentLevel.longitude,
      },
      {
        latitude: (markerPosition as LatLngLiteral).lat,
        longitude: (markerPosition as LatLngLiteral).lng,
      },
    );
    let calculatedScore: number =
      distAway >= 800 ? 0 : Math.round(0.0015625 * (distAway - 800) ** 2);
    setMetresAway(distAway);
    setScoreGained(calculatedScore);
    setScore(score + calculatedScore);
  };

  if (loading) return <LoadingScreen />;
  if (roundState === RoundState.END_SCREEN)
    return (
      <Summary totalScore={score} handleClick={() => navigate("/gamemodes")} />
    );
  return (
    <>
      <GameContext.Provider
        value={{
          scoreGained,
          setScore,
          roundState,
          metresAway,
          nextLevel,
          markerPosition,
          setMarkerPosition,
          currentLevel,
        }}
      >
        <div className={classes.container}>
          <div className={classes.score}>
            <div>
              <div>Round</div>
              <div>
                {round}/{maxRounds}
              </div>
            </div>
            <div>
              <div>Score</div>
              <div>{score}</div>
            </div>
          </div>
          {gamemode === Gamemodes.TIMED_5MIN && (
            <div className={classes.timerContainer}>
              <div className={classes.timer}>
                <div>
                  {formattedMinutes}:{formattedSeconds}
                </div>
              </div>
            </div>
          )}
          <Map />
          <Panorama />
        </div>
      </GameContext.Provider>
    </>
  );
}

export default PlayPage;
