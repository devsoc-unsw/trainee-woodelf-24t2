export interface TypedRequest<T> extends Express.Request {
  body: T;
}

export interface RegisterBody {
  username: string;
  password: string;
}
