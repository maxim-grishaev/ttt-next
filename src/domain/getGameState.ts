import { TttBoard, TttPlayer } from './board';

export enum GameState {
  Playing = '...',
  X = 'X',
  O = 'O',
  Draw = '=',
}

export const getGameState = (board: TttBoard): GameState => {
  if (hasPalyerWon(board, TttPlayer.X)) {
    return GameState.X;
  }
  if (hasPalyerWon(board, TttPlayer.O)) {
    return GameState.O;
  }
  return board.some((it) => it === TttPlayer.Nobody)
    ? GameState.Playing
    : GameState.Draw;
};

type WinIndices = [number, number, number];

/*
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
const WINNING_POSITIONS: WinIndices[] = [
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

export const getWinnerByGameState = (boardState: GameState) =>
  boardState === GameState.X
    ? TttPlayer.X
    : boardState === GameState.O
      ? TttPlayer.O
      : TttPlayer.Nobody;

export const opponent = (player: TttPlayer) =>
  player === TttPlayer.X ? TttPlayer.O : TttPlayer.X;

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
