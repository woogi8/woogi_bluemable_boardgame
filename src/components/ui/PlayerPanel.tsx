'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { PLAYER_COLORS, PLAYER_TOKENS } from '@/types/game';
import { BOARD_TILES } from '@/lib/boardData';

export default function PlayerPanel() {
  const players = useGameStore((s) => s.players);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const ownership = useGameStore((s) => s.ownership);
  const buildings = useGameStore((s) => s.buildings);
  const welfareFund = useGameStore((s) => s.welfareFund);

  return (
    <div className="flex flex-col gap-1.5 w-[200px]">
      {players.map((p) => {
        const isActive = currentPlayerIndex === p.id && !p.bankrupt;
        const ownedTiles = Object.entries(ownership)
          .filter(([, ownerId]) => ownerId === p.id)
          .map(([tileId]) => Number(tileId));

        return (
          <motion.div
            key={p.id}
            layout
            className="rounded-lg p-2"
            style={{
              background: p.bankrupt
                ? 'rgba(100,100,100,0.8)'
                : 'rgba(255,255,255,0.95)',
              border: isActive
                ? `3px solid ${PLAYER_COLORS[p.id]}`
                : '2px solid transparent',
              boxShadow: isActive
                ? `0 0 10px ${PLAYER_COLORS[p.id]}60`
                : '0 1px 3px rgba(0,0,0,0.1)',
              opacity: p.bankrupt ? 0.6 : 1,
            }}
          >
            {/* 이름 */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span style={{ fontSize: 14 }}>{PLAYER_TOKENS[p.id]}</span>
              <span
                className="font-extrabold"
                style={{
                  fontSize: 12,
                  color: p.bankrupt ? '#999' : PLAYER_COLORS[p.id],
                }}
              >
                {p.name}
                {p.bankrupt && ' 💀'}
              </span>
            </div>

            {!p.bankrupt && (
              <>
                {/* 자금 */}
                <div
                  className="font-black mb-0.5"
                  style={{ fontSize: 14, color: '#2E7D32' }}
                >
                  💰 {p.money}만
                </div>

                {/* 위치 */}
                <div style={{ fontSize: 9, color: '#78909C' }}>
                  📍 {BOARD_TILES[p.position]?.name}
                  {p.islandTurns > 0 && ` (🏝️${p.islandTurns}턴)`}
                </div>

                {/* 보유 카드 */}
                <div className="flex gap-1 mt-0.5">
                  {p.freePass > 0 && (
                    <span
                      className="rounded"
                      style={{
                        fontSize: 8,
                        background: '#E8F5E9',
                        padding: '1px 3px',
                        border: '1px solid #A5D6A7',
                      }}
                    >
                      🎫x{p.freePass}
                    </span>
                  )}
                  {p.escapeCard > 0 && (
                    <span
                      className="rounded"
                      style={{
                        fontSize: 8,
                        background: '#E3F2FD',
                        padding: '1px 3px',
                        border: '1px solid #90CAF9',
                      }}
                    >
                      📻x{p.escapeCard}
                    </span>
                  )}
                </div>

                {/* 소유 부동산 */}
                <div className="flex flex-wrap gap-0.5 mt-1">
                  {ownedTiles.map((tileId) => {
                    const tile = BOARD_TILES[tileId];
                    const bl = buildings[tileId] || 0;
                    return (
                      <div
                        key={tileId}
                        className="flex items-center gap-0.5 rounded"
                        style={{
                          fontSize: 9,
                          padding: '1px 3px',
                          background: tile.color,
                          border: '1px solid #ccc',
                        }}
                        title={`${tile.name} ${tile.price}만`}
                      >
                        {tile.icon}
                        {bl > 0 && (
                          <span style={{ fontSize: 7 }}>
                            {bl >= 3 ? '🏨' : bl === 2 ? '🏢' : '🏠'}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        );
      })}

      {/* 사회복지기금 */}
      <div
        className="rounded-md p-1.5 text-center"
        style={{
          background: 'rgba(255,235,59,0.2)',
          border: '1px solid #FFC107',
        }}
      >
        <div className="font-bold" style={{ fontSize: 9, color: '#F57F17' }}>
          💰 사회복지기금
        </div>
        <div className="font-black" style={{ fontSize: 13, color: '#E65100' }}>
          {welfareFund}만원
        </div>
      </div>
    </div>
  );
}
