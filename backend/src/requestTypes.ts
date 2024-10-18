export interface TypedRequest<T> extends Express.Request {
  body: T;
}

export interface TypedRequestQuery<T> extends Express.Request {
  query: T;
}

export interface TypedResponse<T> extends Express.Response {
  body: T;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface LeaderboardQuery {
  pagenum: string;
  gamemode: string;
  increments: string;
}
