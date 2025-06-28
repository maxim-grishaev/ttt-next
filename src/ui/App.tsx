'use client';
import { useState } from 'react';
import { EMPTY_FIELD, TttPlayer, hasStarted } from '@/domain/board';
import { Board } from './Board';
import {
  GameState,
  getGameState,
  opponent,
  updateBoard,
} from '@/domain/getGameState';
import { getBotMove } from '@/domain/getBotMove';

export default function App() {
  const [withRobot, setWithRobot] = useState(false);
  const [currentPlayer, setPlayer] = useState(TttPlayer.X);
  const [currentBoard, setBoard] = useState(EMPTY_FIELD);

  const restart = () => {
    setPlayer(TttPlayer.X);
    setBoard(EMPTY_FIELD);
  };

  const gs = getGameState(currentBoard);
  return (
    <div className='App'>
      <h1>TicTacToe</h1>
      <p>
        <label>
          <input
            type='checkbox'
            checked={withRobot}
            onChange={({ target: { checked } }) => setWithRobot(checked)}
          />
          &nbsp;Next move with robot
        </label>
      </p>

      <Board
        board={currentBoard}
        onBoxClick={(playerIdx) => {
          if (gs !== GameState.Playing) {
            return;
          }
          const board = updateBoard(currentBoard, currentPlayer, playerIdx);
          setBoard(board);
          if (!withRobot) {
            setPlayer(opponent(currentPlayer));
            return;
          }

          if (getGameState(board) !== GameState.Playing) {
            return;
          }

          const botIdx = getBotMove({
            board,
            player: opponent(currentPlayer),
          });
          if (botIdx !== null) {
            board[botIdx] = opponent(currentPlayer);
            setBoard(board);
          }
        }}
      />
      {GameState.Draw === gs && <p style={{ color: 'yellow' }}>It's a draw!</p>}
      {GameState.X === gs && <p style={{ color: 'green' }}>Player X wins!</p>}
      {GameState.O === gs && <p style={{ color: 'red' }}>Player O wins!</p>}
      {GameState.Playing === gs && (
        <p style={{ color: 'lightblue' }}>Playing...</p>
      )}
      {GameState.Playing !== gs && (
        <p>
          <button onClick={restart}>Restart</button>
        </p>
      )}
    </div>
  );
}
