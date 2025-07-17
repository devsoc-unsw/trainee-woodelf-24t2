import { Dispatch, SetStateAction } from "react";
import { RoundState } from "./enums";
import { LatLngLiteral } from "leaflet";

export interface Level {
  photoLink: string;
  locationName: string | null;
  latitude: number;
  longitude: number;
}

export interface GameContextTypes {
  scoreGained: number;
  setScore: Dispatch<SetStateAction<number>>;
  roundState: RoundState;
  metresAway: number;
  nextLevel: () => void;
  markerPosition: LatLngLiteral | null;
  setMarkerPosition: Dispatch<SetStateAction<LatLngLiteral | null>>;
  currentLevel: Level;
}
