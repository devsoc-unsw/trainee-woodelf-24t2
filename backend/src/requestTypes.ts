export interface TypedRequest<T> extends Express.Request {
  body: T;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface LogoutBody {
  sessionId: string;
}
