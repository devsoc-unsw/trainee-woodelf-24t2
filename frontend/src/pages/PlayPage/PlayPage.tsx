import ReactPannellum, {
  addScene,
  loadScene,
  addHotSpot,
  // @ts-ignore
} from "react-pannellum";
import { useEffect, useRef, useState } from "react";
// change this to your local version
import { MazeMap, Marker } from "../../../../../mazemap-react";
// import { MazeMap } from "@lachlanshoesmith/mazemap-react";
import classes from "./PlayPage.module.scss";
import { useTimer } from "react-timer-hook";
import getDistance from "geolib/es/getPreciseDistance";
import { useLocation } from "react-router-dom";
import { Gamemodes } from '../../types/GameTypes'

enum Roundstate {
  ROUND_STARTED = 0,
  IN_PROGRESS = 1,
}

interface Hotspot {
  levelId: string;
  pitch: number;
  panorama: string;
  yaw: number;
  targetPitch: number;
  targetYaw: number;
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
    if (isMounted.current) {
      fn();
    } else {
      isMounted.current = true;
    }
  }, deps);
};

function PlayPage() {
  const [levelPano, setLevelPano] = useState<string>("");
  const [dataFetched, setDataFetched] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [levelId, setLevelId] = useState("");
  const [hotspotConfigs, setHotspotConfigs] = useState([{}]);
  const [maxRounds, setMaxRounds] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [hoverOnMap, setHoverOnMap] = useState(false);
  const [panoramaLoaded, setPanoramaLoaded] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const [showRoundEnd, setShowRoundEnd] = useState(false);
  const [distanceAway, setDistanceAway] = useState(0);
  const [roundstate, setRoundstate] = useState<Roundstate>(
    Roundstate.ROUND_STARTED,
  );
  const [markerCoordinates, setMarkerCoordinates] = useState<Coordinates>({
    lng: 0,
    lat: 0,
    zLevel: 0,
  });
  const [locationCoordinates, setLocationCoordinates] = useState<Coordinates>({
    lng: 0,
    lat: 0,
    zLevel: 0,
  });
  const [hotpoint, setHotpoint] = useState("");
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

  const { state } = useLocation();
  const gamemode = state.gamemode;

  const expiryTimestamp = new Date();
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => console.warn("GAME OVER!!!"),
  });

  const restartTimer = () => {
    if (gamemode === Gamemodes.EXPLORATION) return;

    const newExpiryTimestamp = new Date(
      Date.now() +
        (gamemode === Gamemodes.TIMED_5MIN
          ? minutesToMilliseconds(5)
          : gamemode === Gamemodes.TIMED_10MIN
          ? minutesToMilliseconds(10)
          : 0),
    );

    setShowTimer(true);
    restart(newExpiryTimestamp);
  };

  useEffect(() => {
    setMaxRounds(8);
    loadLevel();
  }, []);

  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(1, "0");

  useEffectAfterMount(() => {
    loadHotspots();
  }, [hotpoint]);

  const loadHotspots = async () => {
    if (hotpoint === "") return;
    const data = await fetch(`/api/level?levelId=${hotpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((err) => {
        console.error("Error fetching level:", err);
      });

    if ("hotspots" in data) {
      data.hotspots.forEach((hotspot: Hotspot) => {
        addScene(
          hotspot.levelId,
          { ...config, imageSource: hotspot.panorama },
          () => {},
        );
      });
    }

    const hotspotData = data.hotspots.map(
      ({ pitch, yaw, levelId }: Hotspot) => ({
        pitch,
        yaw,
        sceneId: levelId,
        type: "scene",
        clickHandlerFunc: () => {
          setHotpoint(levelId);
        },
      }),
    );
    setHotspotConfigs(hotspotData);
    setLevelId(hotpoint);
  };

  const loadLevel = async () => {
    const data = await fetch("/api/level?levelId=bJZAu949bn3GL4sm54O3", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((err) => {
        console.error("Error fetching level:", err);
      });
    setLevelPano(data.photoLink);

    setLocationCoordinates({
      lat: data.latitude,
      lng: data.longitude,
      zLevel: data.zPosition,
    });
    if ("hotspots" in data) {
      data.hotspots.forEach((hotspot: Hotspot) => {
        addScene(
          hotspot.levelId,
          { ...config, imageSource: hotspot.panorama },
          () => {},
        );
      });
      const hotspotData = data.hotspots.map(
        ({ pitch, yaw, levelId }: Hotspot) => ({
          pitch,
          yaw,
          sceneId: levelId,
          type: "scene",
          clickHandlerFunc: () => {
            setHotpoint(levelId);
          },
        }),
      );
      setHotspotConfigs(hotspotData);
    }

    setLevelId("bJZAu949bn3GL4sm54O3");
    addScene(
      "bJZAu949bn3GL4sm54O3",
      { ...config, imageSource: data.photoLink },
      () => {},
    );
    setTimeout(() => {
      loadScene(`bJZAu949bn3GL4sm54O3`);
    }, 1000);
    setDataFetched(true);
  };

  const guess = () => {
    if (round < maxRounds) {
      loadLevel();
      setRoundstate(Roundstate.ROUND_STARTED);
      setRound(round + 1);
      setMarkerCoordinates({
        lng: 0,
        lat: 0,
        zLevel: 0,
      });
    } else {
      // put here what happens after last round
      console.log("round over");
    }
  };

  const calculateScore = (marker: Coordinates, location: Coordinates) => {
    const distanceInMetres = getDistance(
      { latitude: location.lng, longitude: location.lat },
      { latitude: marker.lat, longitude: marker.lng },
    );
    console.log(distanceInMetres);
    if (!marker.lat) return;

    const maxScore = 1000;
    let calculatedScore: number =
      maxScore * (Math.E ^ (-(Math.log(1000) / 90) * distanceInMetres));
    console.log(distanceInMetres);

    if (marker.zLevel != undefined && location.zLevel != undefined) {
      const levelDifference: number = Math.abs(marker.zLevel - location.zLevel);
      if (levelDifference < 1) {
        calculatedScore = calculatedScore * 2;
      } else if (levelDifference < 2) {
        calculatedScore = calculatedScore * 1.8;
      } else if (levelDifference < 3) {
        calculatedScore = calculatedScore * 1.6;
      } else if (levelDifference < 4) {
        calculatedScore = calculatedScore * 1.4;
      } else if (levelDifference < 5) {
        calculatedScore = calculatedScore * 1.2;
      }
    }
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
        {showRoundEnd && (
          <>
            <MazeMap
              campuses={111}
              zoom={14.5}
              height={"90%"}
              width={"100%"}
              center={{ lng: 151.23140898946815, lat: -33.91702431505671 }}
              {...(markerCoordinates.lat && {
                line: {
                  colour: "hsl(52, 100%, 50%)",
                  coordinates: [
                    {
                      lng: locationCoordinates.lat,
                      lat: locationCoordinates.lng,
                    },
                    { lng: markerCoordinates.lng, lat: markerCoordinates.lat },
                  ],
                  width: 3,
                },
              })}
            />
            <div className={classes.buttonArea}>
              <div className={classes.distanceText}>
                {markerCoordinates.lat ? (
                  <div> Distance: {distanceAway}m </div>
                ) : (
                  <div>lol you didn't place a marker</div>
                )}
              </div>
              <button
                className={classes.nextButton}
                onClick={() => {
                  setShowRoundEnd(false);
                  guess();
                }}
              >
                Next
              </button>
            </div>
          </>
        )}
        {!showRoundEnd && (
          <>
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
                  sceneId={levelId}
                  style={style}
                  imageSource={levelPano}
                  config={config}
                  onPanoramaLoaded={() => {
                    // this onPanoLoaded gets called twicfe during refresh
                    // causing hotspots to bug out so this ignores the second call.
                    setLoadCount(loadCount + 1);
                    if (loadCount === 1) return;
                    if (roundstate === Roundstate.ROUND_STARTED) {
                      restartTimer();
                      setRoundstate(Roundstate.IN_PROGRESS);
                    }
                    hotspotConfigs.forEach((hotspot) => {
                      addHotSpot(hotspot, levelId);
                    });
                    setPanoramaLoaded(true);
                  }}
                />
              )}
            </div>
            <div className={classes.canvasWrapper}>
              {panoramaLoaded && (
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
                  marker={{
                    type: Marker.Marker,
                    colour: "hsl(300, 1%, 14%)",
                    innerColour: "hsl(52, 100%, 50%)",
                    size: 20,
                  }}
                />
              )}
              <button
                className={classes.guessButton}
                onClick={() => {
                  calculateScore(markerCoordinates, locationCoordinates);
                  setDistanceAway(
                    getDistance(
                      {
                        latitude: locationCoordinates.lng,
                        longitude: locationCoordinates.lat,
                      },
                      {
                        latitude: markerCoordinates.lat,
                        longitude: markerCoordinates.lng,
                      },
                    ),
                  );
                  setShowRoundEnd(true);
                }}
              >
                Guess
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PlayPage;
