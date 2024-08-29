export interface TypedRequest<T> extends Express.Request {
  body: T;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface ParamsType<T> extends Express.Request {
    params: T;
}