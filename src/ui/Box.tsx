import { TttPlayer } from '@/domain/board';
import styles from './Box.module.css';

export const Box = ({
  state,
  onClick,
}: {
  state: TttPlayer;
  onClick: () => void;
}) => {
  const isEmpty = state === ' ';
  return (
    <div
      className={[
        styles.box,
        state === TttPlayer.X
          ? styles.x
          : state === TttPlayer.O
            ? styles.o
            : '',
      ].join(' ')}
      onClick={isEmpty ? onClick : undefined}
    >
      {isEmpty ? <>&nbsp;</> : state === 'x' ? '❌' : '〇'}
    </div>
  );
};
