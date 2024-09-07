import ReactPannellum, {
  addScene,
  loadScene,
  addHotSpot,
  // @ts-ignore
} from "react-pannellum";
import { useEffect, useRef, useState } from "react";
// change this to your local version
import { MazeMap } from "../../../../../mazemap-react";
// import { MazeMap } from "@lachlanshoesmith/mazemap-react";
import classes from "./PlayPage.module.scss";
import { useTimer } from "react-timer-hook";

enum Gamemodes {
  EXPLORATION = 0,
  TIMED_5MIN = 1,
  TIMED_10MIN = 2,
}

interface PlayPageProps {
  Gamemode: Gamemodes;
}

interface Coordinates {
  lng: number;
  lat: number;
  zLevel: number;
}

// Skips this useEffect running on mount.
// - Ensures this only runs after panorama is loaded!
const useEffectAfterMount = (fn: () => void, deps: any[] = []) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    fn();
  }, deps);
};

function PlayPage(props: PlayPageProps) {
  const [levels, setLevels] = useState<string[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [hoverOnMap, setHoverOnMap] = useState(false);
  const [panoramaLoaded, setPanoramaLoaded] = useState(false);
  const [markerCoordinates, setMarkerCoordinates] = useState<Coordinates>({
    lng: -1,
    lat: -1,
    zLevel: -1,
  });
  const [locationCoordinates, setLocationCoordinates] = useState<Coordinates[]>([{
    lng: -1,
    lat: -1,
    zLevel: -1,
  }]);
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

  const minutesToMilliseconds = (minutes: number): number => {
    return minutes * 60 * 1000;
  };

  const expiryTimestamp = new Date();
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => console.warn("GAME OVER!!!"),
  });

  const restartTimer = () => {
    if (props.Gamemode === Gamemodes.EXPLORATION) return;

    const newExpiryTimestamp = new Date(
      Date.now() +
        (props.Gamemode === Gamemodes.TIMED_5MIN
          ? minutesToMilliseconds(5)
          : props.Gamemode === Gamemodes.TIMED_10MIN
          ? minutesToMilliseconds(10)
          : 0),
    );

    setShowTimer(true);
    restart(newExpiryTimestamp);
  };

  useEffect(() => {
    // make request to get levels here

    // const levelTestArray = [{
    //   photoLink: "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_125023_00_031.jpg?alt=media&token=7f607942-d19f-4674-9627-e882ad132524",
    //   latitude:
    // }]
    setLevels([
      "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_125023_00_031.jpg?alt=media&token=7f607942-d19f-4674-9627-e882ad132524",
      "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_105158_00_016.jpg?alt=media&token=ec0fee7f-5bec-416a-926e-04104e2639c8",
      "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_105419_00_018.jpg?alt=media&token=b29f06bb-e549-4807-a4a6-e26c4d8fc607",
    ]);

    setDataFetched(true);
  }, []);

  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(1, "0");

  // adds levels to panorama after it loads!
  useEffectAfterMount(() => {
    setMaxRounds(levels.length);
    for (let i = 0; i < levels.length; i++) {
      let otherConfig = { ...config, imageSource: levels[i] };
      addScene(`level${i}`, otherConfig, () => {});
    }
  }, [panoramaLoaded]);

  const guess = () => {
    restartTimer();
    loadScene(`level${round}`);
    calculateScore(markerCoordinates, locationCoordinates[round - 1]);
    // put here what happens after last round
    if (round < maxRounds) setRound(round + 1);
  };

  const calculateScore = (marker: Coordinates, location: Coordinates) => {
    setScore(score + 1);
  }

  return (
    <>
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
        <div className={classes.reactPannellumWrapper}>
          {showTimer && (
            <div className={classes.timer}>
              <div>
                {formattedMinutes}:{formattedSeconds}
              </div>
            </div>
          )}
          {dataFetched && (
            <ReactPannellum
              id="1"
              sceneId="scene1"
              style={style}
              imageSource={levels[0]}
              config={config}
              onPanoramaLoaded={() => {
                restartTimer();
                setPanoramaLoaded(true);
              }}
            />
          )}
        </div>

        <div className={classes.canvasWrapper}>
          <MazeMap
            campuses={111}
            zoom={14.5}
            height={hoverOnMap ? "450px" : "300px"}
            width={hoverOnMap ? "700px" : "500px"}
            center={{ lng: 151.23140898946815, lat: -33.91702431505671 }}
            onMapClick={(coords, zLevel) => {
              setMarkerCoordinates({
                lng: coords[0],
                lat: coords[1],
                zLevel: zLevel,
              });
            }}
            // having issues with marker and line, consult lachlan
          />
          <button className={classes.guessButton} onClick={guess}>
            Guess
          </button>
        </div>
      </div>
    </>
  );
}

export default PlayPage;
