import { Action } from '@/lib/types';

export type TttActionMap = {
  RESTART: void;
  PLAYER_MOVE: { index: number };
  WITH_ROBOT_CHANGED: { shouldUseRobot: boolean };
};

export type TttAction = {
  [T in keyof TttActionMap]: Action<T, TttActionMap[T]>;
}[keyof TttActionMap];

export type TttActionByName<K extends keyof TttActionMap> = Action<
  K,
  TttActionMap[K]
>;
