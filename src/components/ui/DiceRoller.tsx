'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { DICE_DOT_POSITIONS } from '@/lib/diceUtils';

function DiceFace({
  value,
  rolling,
  size,
}: {
  value: number;
  rolling: boolean;
  size: number;
}) {
  const dots = DICE_DOT_POSITIONS[value] || [];
  const dotSize = Math.max(4, size * 0.17);

  return (
    <motion.div
      className="grid grid-cols-3 grid-rows-3"
      animate={rolling ? { rotate: Math.random() * 360 } : { rotate: 0 }}
      transition={rolling ? { duration: 0 } : { duration: 0.3 }}
      style={{
        width: size,
        height: size,
        background: '#FFFDE7',
        border: '2px solid #5D4037',
        borderRadius: Math.max(4, size * 0.15),
        padding: size * 0.1,
        boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <div
            key={`${row}-${col}`}
            className="flex items-center justify-center"
          >
            {dots.some(([r, c]) => r === row && c === col) && (
              <div
                className="rounded-full"
                style={{
                  width: dotSize,
                  height: dotSize,
                  background: '#D32F2F',
                }}
              />
            )}
          </div>
        ))
      )}
    </motion.div>
  );
}

interface DiceRollerProps {
  scale?: number;
}

export default function DiceRoller({ scale = 1 }: DiceRollerProps) {
  const dice = useGameStore((s) => s.dice);
  const rolling = useGameStore((s) => s.rolling);
  const diceSize = Math.round(46 * scale);

  return (
    <div className="flex justify-center" style={{ gap: 10 * scale }}>
      <DiceFace value={dice[0]} rolling={rolling} size={diceSize} />
      <DiceFace value={dice[1]} rolling={rolling} size={diceSize} />
    </div>
  );
}
