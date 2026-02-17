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

      {/* 황금열쇠 카드 더미 */}
      <div
        className="absolute"
        style={{
          top: 6 * scale,
          left: 6 * scale,
        }}
      >
        {/* 카드 더미 (아래 카드들) */}
        <div
          className="absolute"
          style={{
            width: 52 * scale,
            height: 72 * scale,
            background: 'linear-gradient(135deg, #FFF8E1, #FFE082)',
            borderRadius: 4 * scale,
            border: `${2 * scale}px solid #F9A825`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            transform: 'rotate(-3deg)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: 52 * scale,
            height: 72 * scale,
            background: 'linear-gradient(135deg, #FFF8E1, #FFE082)',
            borderRadius: 4 * scale,
            border: `${2 * scale}px solid #F9A825`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            transform: 'rotate(2deg)',
          }}
        />
        {/* 맨 위 카드 */}
        <div
          className="relative flex flex-col items-center justify-center"
          style={{
            width: 52 * scale,
            height: 72 * scale,
            background: 'linear-gradient(145deg, #FFFDE7, #FFF9C4)',
            borderRadius: 4 * scale,
            border: `${2 * scale}px solid #F9A825`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          <span style={{ fontSize: 20 * scale, lineHeight: 1 }}>🔑</span>
          <span
            className="font-bold"
            style={{
              fontSize: 7 * scale,
              color: '#E65100',
              marginTop: 3 * scale,
              letterSpacing: 0.5,
            }}
          >
            황금열쇠
          </span>
        </div>
      </div>

      {/* 우주 정거장 */}
      <div
        className="absolute"
        style={{
          top: 6 * scale,
          right: 6 * scale,
        }}
      >
        <div
          className="absolute"
          style={{
            width: 52 * scale,
            height: 72 * scale,
            background: 'linear-gradient(135deg, #E8EAF6, #9FA8DA)',
            borderRadius: 4 * scale,
            border: `${2 * scale}px solid #5C6BC0`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            transform: 'rotate(3deg)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: 52 * scale,
            height: 72 * scale,
            background: 'linear-gradient(135deg, #E8EAF6, #9FA8DA)',
            borderRadius: 4 * scale,
            border: `${2 * scale}px solid #5C6BC0`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            transform: 'rotate(-2deg)',
          }}
        />
        <div
          className="relative flex flex-col items-center justify-center"
          style={{
            width: 52 * scale,
            height: 72 * scale,
            background: 'linear-gradient(145deg, #E8EAF6, #C5CAE9)',
            borderRadius: 4 * scale,
            border: `${2 * scale}px solid #5C6BC0`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          <span style={{ fontSize: 20 * scale, lineHeight: 1 }}>🛸</span>
          <span
            className="font-bold"
            style={{
              fontSize: 6 * scale,
              color: '#283593',
              marginTop: 3 * scale,
              letterSpacing: 0.5,
            }}
          >
            우주정거장
          </span>
        </div>
      </div>

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
