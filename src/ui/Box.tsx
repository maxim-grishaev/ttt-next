import { TttPlayer } from '@/domain/TttPlayer';
import styles from './Box.module.css';

export const Box = ({
  player,
  onClick = () => {},
  className,
}: {
  player: TttPlayer;
  onClick?: () => void;
  className?: string;
}) => {
  const isEmpty = player === ' ';
  const classes = [styles.box, className || '', PLAYER_TO_CSS_MAP[player]];
  return (
    <span className={classes.join(' ')} onClick={isEmpty ? onClick : undefined}>
      {isEmpty ? <>&nbsp;</> : player === 'x' ? '❌' : '〇'}
    </span>
  );
};

const PLAYER_TO_CSS_MAP: Record<TttPlayer, string> = {
  [TttPlayer.PX]: styles.x,
  [TttPlayer.PO]: styles.o,
  [TttPlayer.Nobody]: styles.nobody,
};
