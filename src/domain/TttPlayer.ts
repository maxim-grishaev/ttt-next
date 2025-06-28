export enum TttPlayer {
  Nobody = ' ',
  PX = 'x',
  PO = '0',
}
export const isNobody = (player: TttPlayer) => player === TttPlayer.Nobody;

export const getOpponent = (player: TttPlayer) =>
  player === TttPlayer.PX ? TttPlayer.PO : TttPlayer.PX;
