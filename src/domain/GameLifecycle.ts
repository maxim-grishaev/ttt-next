import { TttBoard } from './TttBoard';
import { TttPlayer } from './TttPlayer';

export enum GameLifecycle {
  Playing = '...',
  X = 'X',
  O = 'O',
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
  if (hasPalyerWon(board, TttPlayer.X)) {
    return GameLifecycle.X;
  }
  if (hasPalyerWon(board, TttPlayer.O)) {
    return GameLifecycle.O;
  }
  return board.some((it) => it === TttPlayer.Nobody)
    ? GameLifecycle.Playing
    : GameLifecycle.Draw;
};

export const getWinnerByGameLifecycle = (boardState: GameLifecycle) =>
  boardState === GameLifecycle.X
    ? TttPlayer.X
    : boardState === GameLifecycle.O
      ? TttPlayer.O
      : TttPlayer.Nobody;
