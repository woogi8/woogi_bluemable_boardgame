'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { BOARD_TILES } from '@/lib/boardData';
import GoldenKeyCardUI from './GoldenKeyCard';

interface ActionModalProps {
  scale?: number;
}

export default function ActionModal({ scale = 1 }: ActionModalProps) {
  const modal = useGameStore((s) => s.modal);
  const players = useGameStore((s) => s.players);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const buyProperty = useGameStore((s) => s.buyProperty);
  const skipBuy = useGameStore((s) => s.skipBuy);
  const buildOnProperty = useGameStore((s) => s.buildOnProperty);
  const skipBuild = useGameStore((s) => s.skipBuild);
  const executeCard = useGameStore((s) => s.executeCard);
  const useFreePass = useGameStore((s) => s.useFreePass);
  const payRent = useGameStore((s) => s.payRent);

  if (!modal) return null;

  const player = players[currentPlayerIndex];
  const fs = (base: number) => base * scale;

  const btnStyle = (bg: string) => ({
    fontSize: fs(10),
    background: bg,
    padding: `${fs(3)}px ${fs(6)}px`,
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex justify-center"
        style={{ marginTop: fs(6) }}
      >
        {modal.type === 'chance' && (
          <GoldenKeyCardUI
            card={modal.card}
            onClose={() => executeCard(modal.card)}
            scale={scale}
          />
        )}

        {modal.type === 'buy' && (
          <div
            className="bg-white rounded-md mx-auto"
            style={{
              padding: fs(8),
              maxWidth: fs(200),
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
            }}
          >
            <div className="font-bold" style={{ fontSize: fs(10), marginBottom: fs(3) }}>
              {BOARD_TILES[modal.tileId].icon} {BOARD_TILES[modal.tileId].name} (
              {BOARD_TILES[modal.tileId].price}만원)
            </div>
            <div style={{ fontSize: fs(9), color: '#666', marginBottom: fs(5) }}>
              보유: {player.money}만원
            </div>
            <div className="flex" style={{ gap: fs(3) }}>
              <button
                onClick={() => buyProperty(modal.tileId)}
                className="flex-1 font-semibold text-white border-none rounded cursor-pointer"
                style={btnStyle('#4CAF50')}
              >
                구매
              </button>
              <button
                onClick={skipBuy}
                className="flex-1 font-semibold text-white border-none rounded cursor-pointer"
                style={btnStyle('#F44336')}
              >
                패스
              </button>
            </div>
          </div>
        )}

        {modal.type === 'build' && (
          <div
            className="bg-white rounded-md mx-auto"
            style={{
              padding: fs(8),
              maxWidth: fs(200),
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
            }}
          >
            <div className="font-bold" style={{ fontSize: fs(10), marginBottom: fs(3) }}>
              🏗️ {BOARD_TILES[modal.tileId].name} ({modal.cost}만원)
            </div>
            <div style={{ fontSize: fs(9), color: '#666', marginBottom: fs(5) }}>
              현재:{' '}
              {modal.currentLevel >= 3
                ? '호텔'
                : modal.currentLevel === 2
                  ? '빌딩'
                  : modal.currentLevel === 1
                    ? '별장'
                    : '대지'}{' '}
              →{' '}
              {modal.currentLevel >= 2
                ? '호텔'
                : modal.currentLevel === 1
                  ? '빌딩'
                  : '별장'}
            </div>
            <div className="flex" style={{ gap: fs(3) }}>
              <button
                onClick={() => buildOnProperty(modal.tileId)}
                className="flex-1 font-semibold text-white border-none rounded cursor-pointer"
                style={btnStyle('#FF9800')}
              >
                건설
              </button>
              <button
                onClick={skipBuild}
                className="flex-1 font-semibold text-white border-none rounded cursor-pointer"
                style={btnStyle('#9E9E9E')}
              >
                패스
              </button>
            </div>
          </div>
        )}

        {modal.type === 'pass' && (
          <div
            className="bg-white rounded-md mx-auto"
            style={{
              padding: fs(8),
              maxWidth: fs(200),
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
            }}
          >
            <div className="font-bold" style={{ fontSize: fs(10), marginBottom: fs(3) }}>
              🎫 우대권 사용?
            </div>
            <div style={{ fontSize: fs(9), color: '#666', marginBottom: fs(5) }}>
              {BOARD_TILES[modal.tileId].name} 통행료: {modal.rent}만원
            </div>
            <div className="flex" style={{ gap: fs(3) }}>
              <button
                onClick={useFreePass}
                className="flex-1 font-semibold text-white border-none rounded cursor-pointer"
                style={btnStyle('#4CAF50')}
              >
                사용
              </button>
              <button
                onClick={payRent}
                className="flex-1 font-semibold text-white border-none rounded cursor-pointer"
                style={btnStyle('#F44336')}
              >
                지불
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
