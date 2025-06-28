import { getIndicesByValue } from '@/lib/getIndicesByValue';
import {
  GameLifecycle,
  getGameLifecycle,
  getWinnerByGameLifecycle,
} from './GameLifecycle';
import { TttBoard, updateBoard } from './TttBoard';
import { getOpponent, TttPlayer } from './TttPlayer';

type Opts = {
  board: TttBoard;
  player: TttPlayer;
};

export const getBotMove = ({ board, player }: Opts) =>
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
  const glc = getGameLifecycle(board);
  if (glc === GameLifecycle.Draw) {
    return createMove(0);
  }
  if (glc !== GameLifecycle.Playing) {
    return player === getWinnerByGameLifecycle(glc)
      ? createMove(1)
      : createMove(-1);
  }

  const opPlayer = getOpponent(player);
  const freeMoves = getIndicesByValue(TttPlayer.Nobody, board).map(
    (cellIndex) => {
      const { score } = minimax({
        board: updateBoard(board, player, cellIndex),
        player: opPlayer,
      });
      return createMove(-score, cellIndex);
    },
  );

  const bestScore = freeMoves.reduce(
    (score, move) => Math.max(score, move.score),
    -Infinity,
  );

  const bestMoves = freeMoves.filter((move) => move.score === bestScore);
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
};
