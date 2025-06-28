import { TttBoard } from './TttBoard';
import { TttPlayer } from './TttPlayer';

export const createTestBoard = (text: string) =>
  text
    .replace(/\s/g, '')
    .split('X')
    .join(TttPlayer.PX)
    .split('0')
    .join(TttPlayer.PO)
    .split('.')
    .join(TttPlayer.Nobody)
    .split('') as TttBoard;
