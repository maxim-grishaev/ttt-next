export enum TttPlayer {
  Nobody = ' ',
  X = 'x',
  O = '0',
}
export type TttBoard = Writeable<typeof EF>;

const P = TttPlayer.Nobody as TttPlayer;
const EF = [P, P, P, P, P, P, P, P, P] as const;

export const EMPTY_FIELD = EF as TttBoard;

export const getFieldIndexByCoords = (ri: number, ci: number) => ri * 3 + ci;
export const getCoordsByFieldIndex = (fi: number) => [
  Math.floor(fi / 3),
  fi % 3,
];

export const isNobody = (player: TttPlayer) => player === TttPlayer.Nobody;

export const hasStarted = (board: TttBoard) =>
  board.every((it) => it === TttPlayer.Nobody);
