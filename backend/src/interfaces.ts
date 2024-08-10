export enum GameState {
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished'
}

// for destination, I'm assuming it will be a link
// I'll change it if needed
export interface ButtonCoordinates {
  x: number;
  y: number;
  destination: string;
}

export interface Level {
  photoLink: string;
  locationName: string;
  locationZCoordinate: number;
  buttons?: ButtonCoordinates[];
}

export interface Game {
  status: GameState;
  levels: Level[];
  score: number;
  owner: string;
  startTime: number; // To calculate time bonuses?
}

export interface User {
  username: string;
  password: string;
  highScore?: number;
  cumulativeScore?: number;
  shirts?: number;   // Would this refer to the number of secrets(clothes drawing) found?
  dateJoined?: number; 
}