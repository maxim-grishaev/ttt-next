import { getBotMove } from './getBotMove';
import { GameLifecycle, getGameLifecycle } from './GameLifecycle';
import { TttBoard, updateBoard } from './TttBoard';
import { getOpponent, TttPlayer } from './TttPlayer';
import { TttState } from './tttReducer';

export const getPlayerMoveState = (
  state: TttState,
  playerIdx: number,
): TttState => {
  if (getGameLifecycle(state.board) !== GameLifecycle.Playing) {
    return state;
  }

  const newState: TttState = {
    ...state,
    board: updateBoard(state.board, state.currentPlayer, playerIdx),
    currentPlayer: state.withRobot
      ? state.currentPlayer
      : getOpponent(state.currentPlayer),
  };

  if (state.withRobot) {
    updateStateByBot(newState.board, getOpponent(newState.currentPlayer));
  }

  return newState;
};

const updateStateByBot = (board: TttBoard, player: TttPlayer) => {
  const botIdx = getBotMove({ board, player });
  if (botIdx === null) {
    return;
  }
  board[botIdx] = player;
};
