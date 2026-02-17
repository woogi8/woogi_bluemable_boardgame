import { DiceResult } from '@/types/game';

export function rollDice(): DiceResult {
  const die1 = Math.ceil(Math.random() * 6);
  const die2 = Math.ceil(Math.random() * 6);
  return {
    die1,
    die2,
    total: die1 + die2,
    isDouble: die1 === die2,
  };
}

// 주사위 눈금 위치 (3x3 그리드에서 점 위치)
export const DICE_DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 2], [2, 0]],
  3: [[0, 2], [1, 1], [2, 0]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};
