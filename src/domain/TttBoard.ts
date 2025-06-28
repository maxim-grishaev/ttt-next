import { Writeable } from '@/lib/types';
import { TttPlayer } from './TttPlayer';

export type TttBoard = Writeable<typeof EB>;

const P = TttPlayer.Nobody as TttPlayer;
const EB = [P, P, P, P, P, P, P, P, P] as const;

export const EMPTY_BOARD = EB as TttBoard;

export const hasStarted = (board: TttBoard) =>
  board.every((it) => it === TttPlayer.Nobody);

export const cloneBoard = (board: TttBoard) => [...board] as TttBoard;
export const updateBoard = (
  board: TttBoard,
  player: TttPlayer,
  idx: number,
) => {
  const newBoard = cloneBoard(board);
  newBoard[idx] = player;
  return newBoard;
};
