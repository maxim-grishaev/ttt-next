import { describe, expect, it } from 'vitest';
import { getBotMove } from './getBotMove';
import { createTestBoard } from './createTestBoard';
import { TttPlayer } from './TttPlayer';

const BOARDS: Record<string, { layout: string; expected: number | null }> = {
  fullBoard: {
    expected: null,
    layout: `
      X X X
      0 X 0
      X 0 0
    `,
  },
  corner: {
    expected: 2,
    layout: `
      X X .
      . . 0
      . . 0
    `,
  },
  preventOrWin: {
    expected: 6,
    layout: `
      X 0 X
      0 X 0
      . . 0
    `,
  },
  lastToDraw: {
    expected: 8,
    layout: `
      X X 0
      0 0 X
      X 0 .
    `,
  },
};
const TEST_CASES = Object.entries(BOARDS).map(
  ([k, v]) => [k, v.layout, v.expected] as const,
);
describe('getBotMove', () => {
  it.each(TEST_CASES)('%s %s => %o', (_name, layout, expected) => {
    const board = createTestBoard(layout);
    expect(getBotMove({ board, player: TttPlayer.PO })).toBe(expected);
    expect(getBotMove({ board, player: TttPlayer.PX })).toBe(expected);
  });
});
