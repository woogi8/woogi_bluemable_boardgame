'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { PLAYER_TOKENS } from '@/types/game';

export default function GameResult() {
  const screen = useGameStore((s) => s.screen);
  const players = useGameStore((s) => s.players);
  const resetGame = useGameStore((s) => s.resetGame);

  if (screen !== 'over') return null;

  const sorted = [...players].sort((a, b) => b.money - a.money);
  const winner = players.find((p) => !p.bankrupt);
  const medals = ['🥇', '🥈', '🥉', ''];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ background: 'rgba(0,0,0,0.7)' }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-white rounded-2xl text-center"
          style={{
            padding: '32px 40px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
          <h2
            className="font-black"
            style={{ fontSize: 22, color: '#1B5E20', marginBottom: 6 }}
          >
            게임 종료!
          </h2>
          <p style={{ fontSize: 14, color: '#37474F', marginBottom: 16 }}>
            {winner?.name} 승리!
          </p>

          {/* 순위 */}
          <div className="mb-4">
            {sorted.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-1.5 px-2.5 py-1 mb-0.5 rounded-md"
                style={{
                  background: i === 0 ? '#FFF9C4' : '#F5F5F5',
                }}
              >
                <span>{medals[i]}</span>
                <span>{PLAYER_TOKENS[p.id]}</span>
                <span className="font-bold" style={{ fontSize: 12 }}>
                  {p.name}
                </span>
                <span
                  className="ml-auto font-semibold"
                  style={{ color: p.bankrupt ? '#F44336' : '#2E7D32' }}
                >
                  {p.bankrupt ? '파산' : `${p.money}만`}
                </span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={resetGame}
            className="font-extrabold text-white border-none cursor-pointer"
            style={{
              padding: '10px 28px',
              fontSize: 14,
              background: 'linear-gradient(135deg, #1B5E20, #4CAF50)',
              borderRadius: 10,
            }}
          >
            🔄 다시하기
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
