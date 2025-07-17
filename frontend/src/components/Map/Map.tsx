import { LatLngLiteral, Map as LeafletMap } from "leaflet";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import classes from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import { RoundState } from "../../enums";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { GameContextTypes } from "../../interfaces";
import { GameContext } from "../../pages/PlayPage/PlayPage";

interface UtilFuncProps {
  setMarkerPosition: Dispatch<SetStateAction<LatLngLiteral | null>>;
  container: MutableRefObject<HTMLDivElement | null>;
}

export default function Map() {
  const [hover, setHover] = useState(false);
  const container = useRef(null);
  const map = useRef<null | LeafletMap>(null);
  const {
    scoreGained,
    roundState,
    nextLevel,
    metresAway,
    markerPosition,
    setMarkerPosition,
    currentLevel,
  } = useContext<GameContextTypes>(GameContext);

  const UNSWCOORDS = {
    lat: -33.91700138429175,
    lng: 151.2292850017548,
  } as LatLngLiteral;

  function useSize(
    ref: MutableRefObject<HTMLDivElement | null>,
  ): DOMRectReadOnly {
    const [size, setSize] = useState({});

    useEffect(() => {
      if (ref.current == null) return;
      const observer = new ResizeObserver(([entry]) =>
        setSize(entry.contentRect),
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return size as DOMRectReadOnly;
  }

  function MapUtils({ setMarkerPosition, container }: UtilFuncProps) {
    const map = useMap();

    useMapEvents({
      click: (e) => {
        if (roundState === RoundState.IN_PROGRESS) return;
        setMarkerPosition(e.latlng);
      },
    });

    const { height } = useSize(container);
    useEffect(() => {
      if (map != null) {
        map.invalidateSize();
      }
    }, [map, height]);

    return null;
  }

  return (
    <div
      className={clsx(
        roundState === RoundState.ROUND_STARTED && classes.mapContainer,
        roundState === RoundState.IN_PROGRESS && classes.mapEndContainer,
      )}
    >
      <div
        ref={container}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className={clsx(
          roundState === RoundState.ROUND_STARTED && classes.mapFlex,
          roundState === RoundState.ROUND_STARTED &&
            !hover &&
            classes.mapDefault,
          roundState === RoundState.ROUND_STARTED && hover && classes.mapHover,
          roundState === RoundState.IN_PROGRESS && classes.mapFull,
        )}
      >
        <MapContainer
          ref={map}
          center={UNSWCOORDS}
          zoom={16}
          className={classes.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUtils
            setMarkerPosition={setMarkerPosition}
            container={container}
          />
          {roundState === RoundState.IN_PROGRESS &&
            markerPosition != null &&
            Object.keys(currentLevel).length !== 0 && (
              <Polyline
                pathOptions={{ color: "black" }}
                positions={[
                  [currentLevel.latitude, currentLevel.longitude],
                  [markerPosition.lat, markerPosition.lng],
                ]}
              />
            )}
          {markerPosition && (
            <Marker position={[markerPosition.lat, markerPosition.lng]} />
          )}
        </MapContainer>
        {roundState === RoundState.ROUND_STARTED && (
          <button className={classes.guessButton} onClick={() => nextLevel()}>
            Guess
          </button>
        )}
      </div>
      {roundState === RoundState.IN_PROGRESS && (
        <div className={classes.nextRoundContainer}>
          <div className={classes.roundEndText}>
            {/* checking for empty object */}
            {markerPosition !== null ? (
              <p>
                You are {metresAway}m away! Gained {scoreGained} score 📌
              </p>
            ) : (
              <p>No marker placed</p>
            )}
          </div>
          <button
            className={classes.nextRoundButton}
            onClick={() => {
              if (map !== null) {
                map.current?.setView(UNSWCOORDS, 16, { animate: false });
              }
              setHover(false);
              nextLevel();
            }}
          >
            Next Round
          </button>
          <div></div>
        </div>
      )}
    </div>
  );
}
