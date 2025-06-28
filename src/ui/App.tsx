'use client';
import { TttPlayer } from '@/domain/TttPlayer';
import { GameLifecycle, getGameLifecycle } from '@/domain/GameLifecycle';
import { Board } from './Board';
import { Box } from './Box';
import { useTttState } from './hooks/useTttState';
import styles from './App.module.css';

export default function App() {
  const {
    state: { board: currentBoard, currentPlayer, withRobot },
    sendEvent,
    createCallback,
  } = useTttState();

  const glc = getGameLifecycle(currentBoard);
  return (
    <div className='App'>
      <h1>
        TicTacToe
        <span className={styles.title}>
          <Box player={TttPlayer.X} className={styles.player} />
          <Box player={TttPlayer.O} className={styles.player} />
        </span>
      </h1>

      <p>
        <label>
          <input
            type='checkbox'
            checked={withRobot}
            onChange={createCallback(
              'WITH_ROBOT_CHANGED',
              ({ target: { checked } }) => ({ shouldUseRobot: checked }),
            )}
          />
          &nbsp;Next move by robot
        </label>
      </p>

      <p className={styles.gameState}>
        {GameLifecycle.Playing === glc ? (
          <span>
            Next move by{' '}
            <Box player={currentPlayer} className={styles.player} />
            ...
          </span>
        ) : (
          <span>Game over!</span>
        )}
      </p>

      <div className={styles.board}>
        <Board
          board={currentBoard}
          onBoxClick={(playerIdx) =>
            sendEvent('PLAYER_MOVE', { index: playerIdx })
          }
        />
        {GameLifecycle.Playing !== glc && (
          <div
            className={[styles.overlay, GAME_LIFECYCLE_TO_CSS_MAP[glc]].join(
              ' ',
            )}
          >
            <p>
              {GameLifecycle.Draw === glc && <span>It's a draw!</span>}
              {GameLifecycle.X === glc && (
                <span>
                  Player <Box className={styles.player} player={TttPlayer.X} />{' '}
                  wins!
                </span>
              )}
              {GameLifecycle.O === glc && (
                <span>
                  Player <Box className={styles.player} player={TttPlayer.O} />{' '}
                  wins!
                </span>
              )}
            </p>
            <button onClick={() => sendEvent('RESTART')}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
}

const GAME_LIFECYCLE_TO_CSS_MAP: Record<GameLifecycle, string> = {
  [GameLifecycle.Draw]: styles.draw,
  [GameLifecycle.X]: styles.winX,
  [GameLifecycle.O]: styles.winO,
  [GameLifecycle.Playing]: styles.playing,
};
