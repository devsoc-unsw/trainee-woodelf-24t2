export enum GameState {
  IN_PROGRESS = 0,
  FINISHED = 1
}

export interface Level {
  id: string;
  photoLink: string;
  locationName: string;
  xCoordinate: number;
  yCoordinate: number;
  zCoordinate: number;
}

export interface Game {
  id: string;
  status: GameState;
  levels: Level[];
  score: number;
  owner: string;
  startTime: Date; // To calculate time bonuses?
}

export interface User {
  id: string;
  username: string;
  highScore?: number;
  cumulativeScore?: number;
  shirts?: number;   // Would this refer to the number of secrets(clothes drawing) found?
  dateJoined?: Date; 
}