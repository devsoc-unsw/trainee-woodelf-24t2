// @ts-ignore
import ReactPannellum from "react-pannellum";
import panoramaImage from "/testimage.png";
import level1 from "./testLevels/IMG_20240803_123419_00_023.jpg";
import level2 from "./testLevels/IMG_20240803_130954_00_035.jpg";
import level3 from "./testLevels/IMG_20240803_140913_00_058.jpg";
import { useEffect, useState } from "react";
// change this to your local version
import { MazeMap } from "../../../../../mazemap-react";
// import { MazeMap } from "@lachlanshoesmith/mazemap-react";
import classes from "./PlayPage.module.scss";
import { useTimer } from "react-timer-hook";
import { LucideAlignVerticalSpaceAround } from "lucide-react";

enum Gamemode {
  EXPLORATION = 0,
  TIMED_5MIN = 1,
  TIMED_10MIN = 2,
}

interface PlayPageProps {
  Gamemodes?: Gamemode;
}

function PlayPage(props: PlayPageProps) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [hoverOnMap, setHoverOnMap] = useState(false);

  const expiryTimestamp = new Date();

  useEffect(() => {
    if (props.Gamemodes === Gamemode.TIMED_5MIN) {
      setShowTimer(true);
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 150);
    } else if (props.Gamemodes === Gamemode.TIMED_10MIN) {
      setShowTimer(true);
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 300);
    } else {
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 0);
    }
    // insert fetch request for levels here
  }, []);

  // fake data
  const levels = {
    level1:
      "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_125023_00_031.jpg?alt=media&token=7f607942-d19f-4674-9627-e882ad132524",
    level2:
      "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_105158_00_016.jpg?alt=media&token=ec0fee7f-5bec-416a-926e-04104e2639c8",
    level3:
      "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_105419_00_018.jpg?alt=media&token=b29f06bb-e549-4807-a4a6-e26c4d8fc607",
  };

  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("GAME OVER!!!"),
  });
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(1, "0");

  const config = {
    type: "equirectangular",
    autoLoad: true,
    showControls: false,
    mouseZoom: true,
    draggable: true,
    keyboardZoom: false,
    showZoomCrtl: false,
    showLoadButton: false,
  };

  const style = {
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.score}>
          <div>
            <div>Round</div>
            <div>
              {round}/{totalRounds}
            </div>
          </div>
          <div>
            <div>Score</div>
            <div>{score}</div>
          </div>
        </div>
        <div className={classes.reactPannellumWrapper}>
          {showTimer && (
            <div className={classes.timer}>
              <div>
                {formattedMinutes}:{formattedSeconds}
              </div>
            </div>
          )}
          <ReactPannellum
            id="1"
            sceneId="scene1"
            style={style}
            imageSource={levels.level1}
            config={config}
          />
        </div>

        <div className={classes.canvasWrapper}>
          <MazeMap
            campuses={111}
            zoom={14.5}
            height={hoverOnMap ? "450px" : "300px"}
            width={hoverOnMap ? "700px" : "500px"}
            center={{ lng: 151.23140898946815, lat: -33.91702431505671 }}
          />
          <button className={classes.guessButton}>Guess</button>
        </div>
      </div>
    </>
  );
}

export default PlayPage;
