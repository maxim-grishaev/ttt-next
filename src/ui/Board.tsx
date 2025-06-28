import { isNobody, TttBoard } from '@/domain/board';
import { getFieldIndexByCoords } from '@/domain/board';
import { range } from '@/lib/range';
import { Box } from './Box';
import styles from './Board.module.css';

export const Board = ({
  board,
  onBoxClick,
}: {
  board: TttBoard;
  onBoxClick: (playerIdx: number) => void;
}) => (
  <div className={styles.board}>
    <div className={styles.rows}>
      {range(3, (ri) => (
        <div key={ri} className={styles.row}>
          {range(3, (ci) => {
            const idx = getFieldIndexByCoords(ri, ci);
            const state = board[idx];
            const classes = [
              styles.cell,
              isNobody(state) ? styles.empty : '',
            ].join(' ');
            return (
              <div key={ci} className={classes}>
                <Box key={ci} state={state} onClick={() => onBoxClick(idx)} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  </div>
);
