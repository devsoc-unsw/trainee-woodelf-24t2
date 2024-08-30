export enum GameState {
  IN_PROGRESS = 0,
  FINISHED = 1,
}

export enum Gamemode {
  EXPLORATION = 0,
  TIMED_5MIN = 1,
  TIMED_10MIN = 2,
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
  gamemode: Gamemode;
  levels: Level[];
  score: number;
  username: string;
  startTime: Date; // To calculate time bonuses?
}

export interface User {
  id: string;
  username: string;
  password: string;
  salt: string;
  profilePicture?: string;
  highScore?: number;
  cumulativeScore?: number;
  shirts?: number; // Would this refer to the number of secrets(clothes drawing) found?
  dateJoined?: Date;
}

export interface SessionStorage {
  sessionId: string;
  userId: string;
  creationDate: Date;
  expirationDate: Date;
}

export interface ScoreEntry {
  rank: number;
  username: string;
  score: number;
}

// Adds a new property to req.session
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}
