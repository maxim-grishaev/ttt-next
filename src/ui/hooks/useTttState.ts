import { TttAction, TttActionMap } from '@/domain/TttAction';
import { TTT_DEFAULT_STATE, tttReducer } from '@/domain/tttReducer';
import { useCallback, useReducer } from 'react';

export const useTttState = () => {
  const [state, dispatch] = useReducer(tttReducer, TTT_DEFAULT_STATE);

  return {
    state,

    sendEvent: useCallback(
      <K extends keyof TttActionMap>(
        event: K,
        ...params: TttActionMap[K] extends void ? [] : [TttActionMap[K]]
      ) => {
        dispatch({ type: event, payload: params[0] } as TttAction);
      },
      [],
    ),

    createCallback: <
      K extends keyof TttActionMap,
      Args extends any[] = unknown[],
    >(
      event: K,
      map: (...payload: Args) => TttActionMap[K],
    ) => {
      return useCallback((...params: Args) => {
        dispatch({ type: event, payload: map(...params) } as TttAction);
      }, []);
    },
  };
};
