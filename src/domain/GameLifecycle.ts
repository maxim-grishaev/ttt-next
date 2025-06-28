import { TttBoard } from './TttBoard';
import { TttPlayer } from './TttPlayer';

export enum GameLifecycle {
  Playing = '...',
  WinX = 'X',
  WinO = 'O',
  Draw = '=',
}

/*
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
const WINNING_POSITIONS: Array<[number, number, number]> = [
  // indices for rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // indices for columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // indices for diagonals
  [0, 4, 8],
  [2, 4, 6],
];

const hasPalyerWon = (board: TttBoard, player: TttPlayer) =>
  WINNING_POSITIONS.some((positions) =>
    positions.every((ci) => board[ci] === player),
  );

export const getGameLifecycle = (board: TttBoard): GameLifecycle => {
  if (hasPalyerWon(board, TttPlayer.PX)) {
    return GameLifecycle.WinX;
  }
  if (hasPalyerWon(board, TttPlayer.PO)) {
    return GameLifecycle.WinO;
  }
  return board.some((it) => it === TttPlayer.Nobody)
    ? GameLifecycle.Playing
    : GameLifecycle.Draw;
};

export const getWinnerByGameLifecycle = (boardState: GameLifecycle) =>
  boardState === GameLifecycle.WinX
    ? TttPlayer.PX
    : boardState === GameLifecycle.WinO
      ? TttPlayer.PO
      : TttPlayer.Nobody;
