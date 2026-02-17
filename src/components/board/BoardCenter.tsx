'use client';

import DiceRoller from '../ui/DiceRoller';
import ActionModal from '../ui/ActionModal';
import { useGameStore } from '@/store/gameStore';
import { PLAYER_COLORS } from '@/types/game';

const BASE_SIZE = 54;

interface BoardCenterProps {
  cellSize: number;
}

export default function BoardCenter({ cellSize }: BoardCenterProps) {
  const screen = useGameStore((s) => s.screen);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const players = useGameStore((s) => s.players);
  const phase = useGameStore((s) => s.phase);
  const rolling = useGameStore((s) => s.rolling);
  const rollDiceAction = useGameStore((s) => s.rollDiceAction);
  const endTurn = useGameStore((s) => s.endTurn);

  const currentPlayer = players[currentPlayerIndex];
  const scale = cellSize / BASE_SIZE;

  return (
    <div
      className="flex flex-col items-center justify-center h-full relative overflow-hidden"
      style={{
        background:
          'linear-gradient(145deg, #E8F5E9 0%, #C8E6C9 30%, #A5D6A7 60%, #81C784 100%)',
        borderRadius: 4,
        padding: 6 * scale,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 12px, #2E7D32 12px, #2E7D32 13px)',
        }}
      />

      <div
        className="relative font-semibold tracking-widest"
        style={{ fontSize: 11 * scale, color: '#2E7D32', marginBottom: 2 * scale }}
      >
        SINCE 1982
      </div>
      <div
        className="relative font-black tracking-wider"
        style={{ fontSize: 26 * scale, color: '#1B5E20', letterSpacing: 3 }}
      >
        부루마블
      </div>
      <div
        className="relative font-bold tracking-widest"
        style={{ fontSize: 10 * scale, color: '#388E3C' }}
      >
        GAME
      </div>

      {screen === 'playing' && currentPlayer && (
        <div className="relative w-full" style={{ marginTop: 4 * scale }}>
          <DiceRoller scale={scale} />

          <div
            className="font-bold text-center"
            style={{
              marginTop: 3 * scale,
              fontSize: 11 * scale,
              color: PLAYER_COLORS[currentPlayerIndex],
            }}
          >
            {currentPlayer.name}의 차례
            {currentPlayer.freePass > 0 && (
              <span style={{ fontSize: 8 * scale, marginLeft: 3 }}>
                🎫x{currentPlayer.freePass}
              </span>
            )}
            {currentPlayer.escapeCard > 0 && (
              <span style={{ fontSize: 8 * scale, marginLeft: 3 }}>
                📻x{currentPlayer.escapeCard}
              </span>
            )}
          </div>

          <div
            className="flex justify-center"
            style={{ gap: 5 * scale, marginTop: 5 * scale }}
          >
            {phase === 'roll' && (
              <button
                onClick={rollDiceAction}
                disabled={rolling}
                className="font-bold text-white border-none rounded-md cursor-pointer disabled:cursor-default"
                style={{
                  fontSize: 11 * scale,
                  padding: `${5 * scale}px ${14 * scale}px`,
                  background: rolling
                    ? '#ccc'
                    : PLAYER_COLORS[currentPlayerIndex],
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                🎲 주사위
              </button>
            )}
            {phase === 'done' && (
              <button
                onClick={endTurn}
                className="font-bold text-white border-none rounded-md cursor-pointer"
                style={{
                  fontSize: 11 * scale,
                  padding: `${5 * scale}px ${14 * scale}px`,
                  background: '#607D8B',
                }}
              >
                ➡️ 턴종료
              </button>
            )}
          </div>

          <ActionModal scale={scale} />
        </div>
      )}
    </div>
  );
}
