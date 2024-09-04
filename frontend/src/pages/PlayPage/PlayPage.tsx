// @ts-ignore
import ReactPannellum from "react-pannellum";
import panoramaImage from "/testimage.png";
import { useEffect, useState } from "react";
// change this to your local version
import { MazeMap } from "../../../../../mazemap-react";
import classes from "./PlayPage.module.scss";
import { useTimer } from "react-timer-hook";
import { setLogLevel } from "firebase/app";

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
  const image = "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_104218_00_009.jpg?alt=media&token=e0f4e654-c428-49d2-846a-d1afe73764a3"
  const levels = {
    level1: "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_103533_00_002.jpg?alt=media&token=21528d89-9ec8-4242-ba0c-02d605b069e0",
    level2: "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_104218_00_009.jpg?alt=media&token=e0f4e654-c428-49d2-846a-d1afe73764a3",
    level3: "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_105010_00_014.jpg?alt=media&token=3170d1d8-a3d5-4a28-bc53-9f02093640cb",
  } 
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
    
    // testing with hardcoded data
  
    setTotalRounds(Object.keys(levels).length);
    ReactPannellum.addScene("scene2", {
      type: "equirectangular",
      panorama: panoramaImage,
      autoLoad: true,
      showControls: true,
    })

    

  }, []);
  
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("GAME OVER!!!"),
  });
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(1, "0");

  const config = {
    type: "equirectangular",
    autoLoad: true,
    showControls: true,
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
            // @ts-ignore
            imageSource={image}
            config={config}
          />
        </div>

        <div className={classes.canvasWrapper}>
          {/* <MazeMap
            campuses={111}
            zoom={14.5}
            height={hoverOnMap ? "450px" : "300px"}
            width={hoverOnMap ? "700px" : "500px"}
            center={{ lng: 151.23140898946815, lat: -33.91702431505671 }}
          /> */}
          <button className={classes.guessButton} onClick={() => ReactPannellum.loadScene("scene2")}> Guess </button>
        </div>
      </div>
    </>
  );
}

export default PlayPage;
