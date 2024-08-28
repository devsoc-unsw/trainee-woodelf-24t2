import { Timestamp } from "firebase/firestore";

export enum GameState {
  IN_PROGRESS = 0,
  FINISHED = 1,
}

export interface Level {
  id?: string;
  photoLink: string;
  locationName: string | undefined;
  latitude: number;
  longitude: number;
  zPosition: number | undefined;
}

export interface Game {
  id?: string;
  status: GameState;
  levels: Level[];
  score: number;
  owner: string;
  startTime: Date; // To calculate time bonuses?
}

export interface User {
  username: string;
  password: string;
  salt: string;
  profilePicture?: string;
  highScore?: number;
  cumulativeScore?: number;
  shirts?: number; // Would this refer to the number of secrets(clothes drawing) found?
  dateJoined: Date | Timestamp;
}

export interface SessionStorage {
  sessionId: string;
  userId: string;
  creationDate: Date;
  expirationDate: Date;
}

// Adds a new property to req.session
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export interface LoginErrors {
  usernameNotFound: boolean;
  passwordInvalid: boolean;
}