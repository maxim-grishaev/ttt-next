import { describe, expect, it } from 'vitest';
import { GameLifecycle, getGameLifecycle } from './GameLifecycle';
import { getOpponent, TttPlayer } from './TttPlayer';
import { createTestBoard } from './createTestBoard';

const BOARDS = {
  Empty: `
    . . .
    . . .
    . . .
  `,
  Playing1: `
    X X 0
    . 0 .
    . . .
  `,
  Playing2: `
    X X 0
    . 0 X
    X 0 0
  `,
  WinX1: `
    X X X
    0 . .
    0 0 .
  `,
  WinX2: `
    X 0 0
    X . .
    X 0 .
  `,
  Win0: `
    X X 0
    0 0 X
    0 X .
  `,
  Draw1: `
    X 0 X
    X 0 X
    0 X 0
  `,
  Draw2: `
    X X 0
    0 0 X
    X 0 X
  `,
};

describe('Board', () => {
  it.each([
    [TttPlayer.PX, TttPlayer.PO],
    [TttPlayer.PO, TttPlayer.PX],
    [TttPlayer.Nobody, TttPlayer.PX],
  ])('getOpponent(%s) = %s', (player, expected) => {
    expect(getOpponent(player)).toBe(expected);
  });

  it.each([
    [BOARDS.Empty, GameLifecycle.Playing],
    [BOARDS.Playing1, GameLifecycle.Playing],
    [BOARDS.Playing2, GameLifecycle.Playing],
    [BOARDS.WinX1, GameLifecycle.WinX],
    [BOARDS.WinX2, GameLifecycle.WinX],
    [BOARDS.Win0, GameLifecycle.WinO],
    [BOARDS.Draw1, GameLifecycle.Draw],
    [BOARDS.Draw2, GameLifecycle.Draw],
  ])('getGameLifecycle(%s) = %s', (boardLayout, expected) => {
    const board = createTestBoard(boardLayout);
    expect(getGameLifecycle(board)).toBe(expected);
  });
});
