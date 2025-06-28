export enum TttPlayer {
  Nobody = ' ',
  X = 'x',
  O = '0',
}
export const isNobody = (player: TttPlayer) => player === TttPlayer.Nobody;

export const getOpponent = (player: TttPlayer) =>
  player === TttPlayer.X ? TttPlayer.O : TttPlayer.X;
