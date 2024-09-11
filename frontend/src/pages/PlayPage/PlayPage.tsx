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
import getDistance from "geolib/es/getPreciseDistance";

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
  zLevel: number | undefined;
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
  const [locationCoordinates, setLocationCoordinates] = useState<Coordinates[]>(
    [],
  );
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
    const levelTestArray = [
      {
        photoLink:
          "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_125023_00_031.jpg?alt=media",
        latitude: -33.9168905801594,
        longitude: 151.2279747161422,
        zPosition: 1,
      },
      {
        photoLink:
          "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_182147_00_114.jpg?alt=media",
        latitude: -33.91713209975908,
        longitude: 151.23261616290625,
        zPosition: 1,
      },
      {
        photoLink:
          "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_151906_00_088.jpg?alt=media",
        latitude: -33.91672599260816,
        longitude: 151.22944083431207,
        zPosition: 1,
      },
      {
        photoLink:
          "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_183833_00_121.jpg?alt=media",
        latitude: -33.917497802856055,
        longitude: 151.23431816023904,
        zPosition: 1,
      },
      {
        photoLink:
          "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_150928_00_084.jpg?alt=media",
        latitude: -33.918044098384186,
        longitude: 151.2299776186045,
        zPosition: 1,
      },
      {
        photoLink:
          "https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_154156_00_094.jpg?alt=media",
        latitude: -33.91697170041918,
        longitude: 151.2278685198697,
        zPosition: 1,
      },
    ];

    const levelDataParsed: string[] = levelTestArray.map(
      (level) => level.photoLink,
    );
    const locationDataParsed: Coordinates[] = levelTestArray.map((level) => ({
      lat: level.latitude,
      lng: level.longitude,
      zLevel: level.zPosition,
    }));

    setLevels(levelDataParsed);
    setLocationCoordinates(locationDataParsed);
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
    const distanceInMetres = getDistance(
      { latitude: location.lat, longitude: location.lng },
      { latitude: marker.lat, longitude: marker.lng },
    );

    const maxScore = 1000; 

    const calculatedScore: number = maxScore * ((Math.E) ^ ((Math.log(1000)/90) * distanceInMetres))
    console.log(distanceInMetres);
    setScore(score + calculatedScore);
  };

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
