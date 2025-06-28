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
import { Box } from './Box';
import styles from './App.module.css';

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
      <h1>
        TicTacToe
        <span className={styles.title}>
          <Box state={TttPlayer.X} className={styles.player} />
          <Box state={TttPlayer.O} className={styles.player} />
        </span>
      </h1>
      <p>
        <label>
          <input
            type='checkbox'
            checked={withRobot}
            onChange={({ target: { checked } }) => setWithRobot(checked)}
          />
          &nbsp;Next move by robot
        </label>
      </p>
      <p className={[styles.gameState, getGSClassName(gs)].join(' ')}>
        {GameState.Draw === gs && <span>It's a draw!</span>}
        {GameState.X === gs && (
          <span>
            Player <Box className={styles.player} state={TttPlayer.X} /> wins!
          </span>
        )}
        {GameState.O === gs && (
          <span>
            Player <Box className={styles.player} state={TttPlayer.O} /> wins!
          </span>
        )}

        {GameState.Playing === gs ? (
          <span>Playing...</span>
        ) : (
          <button onClick={restart}>Restart</button>
        )}
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
    </div>
  );
}

const getGSClassName = (gs: GameState) => {
  switch (gs) {
    case GameState.Draw:
      return styles.draw;
    case GameState.X:
      return styles.winX;
    case GameState.O:
      return styles.winO;
  }
  return styles.playing;
};
