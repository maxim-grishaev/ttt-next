import { panic } from '@/lib/panic';
import { Action } from '@/lib/types';
import { EMPTY_BOARD } from './TttBoard';
import { TttAction } from './TttAction';
import { getPlayerMoveState } from './getPlayerMoveState';
import { TttPlayer } from './TttPlayer';

export type TttState = typeof TTT_DEFAULT_STATE;
export const TTT_DEFAULT_STATE = {
  board: EMPTY_BOARD,
  withRobot: true,
  currentPlayer: TttPlayer.PX,
};

export const tttReducer = (state: TttState, action: TttAction): TttState => {
  switch (action.type) {
    case 'RESTART':
      return { ...TTT_DEFAULT_STATE, withRobot: state.withRobot };
    case 'PLAYER_MOVE':
      return getPlayerMoveState(state, action.payload.index);
    case 'WITH_ROBOT_CHANGED':
      return {
        ...state,
        withRobot: action.payload.shouldUseRobot,
      };
    default:
      return panic(
        `Unknown action type: ${(action as Action<string, unknown>).type}`,
      );
  }
};
