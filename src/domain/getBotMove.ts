import { getIndicesByValue } from '@/lib/getIndicesByValue';
import { TttBoard, TttPlayer } from './board';
import {
  GameState,
  getGameState,
  getWinnerByGameState,
  opponent,
  updateBoard,
} from './getGameState';

type Opts = {
  board: TttBoard;
  player?: TttPlayer;
};

export const getBotMove = ({ board, player = TttPlayer.O }: Opts) =>
  minimax({ board, player }).index;

type TheMove = {
  index: number | null;
  score: number;
};
const createMove = (score: number, index: number | null = null): TheMove => ({
  index,
  score,
});

/*
 * https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13];
 */
const minimax = ({ player, board }: Required<Opts>): TheMove => {
  const gs = getGameState(board);
  if (gs === GameState.Draw) {
    return createMove(0);
  }
  if (gs !== GameState.Playing) {
    return player === getWinnerByGameState(gs)
      ? createMove(10)
      : createMove(-10);
  }

  const freeCells = getIndicesByValue(TttPlayer.Nobody, board);
  const opPlayer = opponent(player);
  const bestMove = freeCells.reduce((bestMoveSoFar, cellIndex) => {
    const opMove = minimax({
      board: updateBoard(board, player, cellIndex),
      player: opPlayer,
    });
    const bestOpMove = createMove(-opMove.score, cellIndex);

    if (bestOpMove.score === bestMoveSoFar.score) {
      return Math.random() < 0.5 ? bestOpMove : bestMoveSoFar;
    }

    return bestOpMove.score > bestMoveSoFar.score ? bestOpMove : bestMoveSoFar;
  }, createMove(-Infinity));

  return bestMove;
};
