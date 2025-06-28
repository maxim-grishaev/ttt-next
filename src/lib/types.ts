export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type Action<T extends string, P> = {
  type: T;
  payload: P;
};
