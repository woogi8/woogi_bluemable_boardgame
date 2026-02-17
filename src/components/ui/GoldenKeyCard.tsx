'use client';

import { motion } from 'framer-motion';
import { GoldenKeyCard } from '@/types/game';

interface Props {
  card: GoldenKeyCard;
  onClose: () => void;
  scale?: number;
}

export default function GoldenKeyCardUI({ card, onClose, scale = 1 }: Props) {
  const fs = (base: number) => base * scale;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-lg"
      style={{
        padding: fs(12),
        maxWidth: fs(230),
        boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
        border: `2px solid ${card.color}`,
      }}
    >
      <div
        className="flex items-center rounded-md"
        style={{
          gap: fs(5),
          padding: `${fs(5)}px ${fs(8)}px`,
          marginBottom: fs(6),
          background: 'linear-gradient(135deg, #FFD54F, #FFB300)',
        }}
      >
        <span style={{ fontSize: fs(16) }}>🔑</span>
        <span className="font-extrabold" style={{ fontSize: fs(11), color: '#5D4037' }}>
          황금열쇠
        </span>
        <span className="ml-auto" style={{ fontSize: fs(7), color: '#795548' }}>
          #{card.id}/30
        </span>
      </div>

      <div className="text-center" style={{ margin: `${fs(6)}px 0` }}>
        <span style={{ fontSize: fs(28) }}>{card.icon}</span>
      </div>

      <div
        className="font-semibold text-center"
        style={{ fontSize: fs(10), color: '#37474F', lineHeight: 1.5, marginBottom: fs(4) }}
      >
        {card.text}
      </div>

      <div
        className="text-center rounded"
        style={{
          fontSize: fs(7),
          color: '#90A4AE',
          background: '#F5F5F5',
          padding: fs(2),
          marginBottom: fs(6),
        }}
      >
        {card.category}
      </div>

      <button
        onClick={onClose}
        className="w-full font-bold text-white border-none rounded-md cursor-pointer"
        style={{ fontSize: fs(11), padding: `${fs(6)}px`, background: '#FFB300' }}
      >
        확인
      </button>
    </motion.div>
  );
}
