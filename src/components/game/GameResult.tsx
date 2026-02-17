'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore, PlayerStats } from '@/store/gameStore';
import { PLAYER_TOKENS, PLAYER_COLORS } from '@/types/game';

export default function GameResult() {
  const screen = useGameStore((s) => s.screen);
  const players = useGameStore((s) => s.players);
  const stats = useGameStore((s) => s.stats);
  const ownership = useGameStore((s) => s.ownership);
  const buildings = useGameStore((s) => s.buildings);
  const resetGame = useGameStore((s) => s.resetGame);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  if (screen !== 'over') return null;

  const sorted = [...players].sort((a, b) => b.money - a.money);
  const winner = players.find((p) => !p.bankrupt);
  const medals = ['🥇', '🥈', '🥉', ''];

  // 현재 소유 부동산 수
  const getOwnedCount = (playerId: number) =>
    Object.values(ownership).filter((oid) => oid === playerId).length;

  // 현재 건물 수
  const getBuildingCount = (playerId: number) => {
    let total = 0;
    Object.entries(buildings).forEach(([tileIdStr, level]) => {
      if (ownership[Number(tileIdStr)] === playerId) total += level;
    });
    return total;
  };

  const selectedStats: PlayerStats | null =
    selectedPlayer !== null ? stats[selectedPlayer] ?? null : null;
  const selectedP = selectedPlayer !== null ? players[selectedPlayer] : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ background: 'rgba(0,0,0,0.7)', overflow: 'auto', padding: 16 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-white rounded-2xl text-center"
          style={{
            padding: '28px 32px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            maxWidth: 500,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 4 }}>🏆</div>
          <h2
            className="font-black"
            style={{ fontSize: 20, color: '#1B5E20', marginBottom: 4 }}
          >
            게임 종료!
          </h2>
          <p style={{ fontSize: 13, color: '#37474F', marginBottom: 14 }}>
            {winner?.name} 승리!
          </p>

          {/* 순위 */}
          <div className="mb-3">
            {sorted.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-1.5 px-2.5 py-1.5 mb-0.5 rounded-md cursor-pointer"
                style={{
                  background:
                    selectedPlayer === p.id
                      ? `${PLAYER_COLORS[p.id]}25`
                      : i === 0
                        ? '#FFF9C4'
                        : '#F5F5F5',
                  border:
                    selectedPlayer === p.id
                      ? `2px solid ${PLAYER_COLORS[p.id]}`
                      : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
                onClick={() =>
                  setSelectedPlayer(selectedPlayer === p.id ? null : p.id)
                }
              >
                <span>{medals[i]}</span>
                <span>{PLAYER_TOKENS[p.id]}</span>
                <span
                  className="font-bold"
                  style={{ fontSize: 12, color: PLAYER_COLORS[p.id] }}
                >
                  {p.name}
                </span>
                <span
                  className="ml-auto font-semibold"
                  style={{
                    fontSize: 12,
                    color: p.bankrupt ? '#F44336' : '#2E7D32',
                  }}
                >
                  {p.bankrupt ? '파산' : `${p.money}만`}
                </span>
                <span style={{ fontSize: 9, color: '#9E9E9E', marginLeft: 4 }}>
                  ▼ 상세
                </span>
              </div>
            ))}
          </div>

          {/* 선택된 플레이어 상세 레포트 */}
          {selectedP && selectedStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="rounded-xl mb-3 text-left"
              style={{
                background: `${PLAYER_COLORS[selectedP.id]}08`,
                border: `2px solid ${PLAYER_COLORS[selectedP.id]}40`,
                padding: '12px 16px',
              }}
            >
              <div
                className="font-bold mb-2 text-center"
                style={{
                  fontSize: 13,
                  color: PLAYER_COLORS[selectedP.id],
                }}
              >
                {PLAYER_TOKENS[selectedP.id]} {selectedP.name} 레포트
              </div>

              {/* 부동산 */}
              <div
                className="rounded-lg mb-2"
                style={{ background: 'rgba(255,255,255,0.8)', padding: '8px 10px' }}
              >
                <div className="font-bold mb-1" style={{ fontSize: 11, color: '#37474F' }}>
                  🏠 부동산
                </div>
                <div className="flex justify-between" style={{ fontSize: 10, color: '#546E7A' }}>
                  <span>구매한 땅</span>
                  <span className="font-bold">{selectedStats.propertiesBought}개</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: 10, color: '#546E7A' }}>
                  <span>현재 보유</span>
                  <span className="font-bold">{getOwnedCount(selectedP.id)}개</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: 10, color: '#546E7A' }}>
                  <span>총 구매비용</span>
                  <span className="font-bold">{selectedStats.totalPurchaseCost}만원</span>
                </div>
              </div>

              {/* 건설 */}
              <div
                className="rounded-lg mb-2"
                style={{ background: 'rgba(255,255,255,0.8)', padding: '8px 10px' }}
              >
                <div className="font-bold mb-1" style={{ fontSize: 11, color: '#37474F' }}>
                  🏗️ 건설
                </div>
                <div className="flex justify-between" style={{ fontSize: 10, color: '#546E7A' }}>
                  <span>보유 건물 수</span>
                  <span className="font-bold">{getBuildingCount(selectedP.id)}개</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: 10, color: '#546E7A' }}>
                  <span>총 건설비용</span>
                  <span className="font-bold">{selectedStats.buildingSpent}만원</span>
                </div>
              </div>

              {/* 통행료 */}
              <div
                className="rounded-lg mb-2"
                style={{ background: 'rgba(255,255,255,0.8)', padding: '8px 10px' }}
              >
                <div className="font-bold mb-1" style={{ fontSize: 11, color: '#37474F' }}>
                  💰 통행료
                </div>
                <div className="flex justify-between" style={{ fontSize: 10, color: '#546E7A' }}>
                  <span>받은 통행료</span>
                  <span className="font-bold" style={{ color: '#2E7D32' }}>
                    +{selectedStats.rentCollected}만원
                  </span>
                </div>
                <div className="flex justify-between" style={{ fontSize: 10, color: '#546E7A' }}>
                  <span>낸 통행료</span>
                  <span className="font-bold" style={{ color: '#D32F2F' }}>
                    -{selectedStats.rentPaid}만원
                  </span>
                </div>
                <div
                  className="flex justify-between mt-0.5 pt-0.5"
                  style={{ fontSize: 10, borderTop: '1px solid #E0E0E0' }}
                >
                  <span className="font-semibold">순수익</span>
                  <span
                    className="font-bold"
                    style={{
                      color:
                        selectedStats.rentCollected - selectedStats.rentPaid >= 0
                          ? '#2E7D32'
                          : '#D32F2F',
                    }}
                  >
                    {selectedStats.rentCollected - selectedStats.rentPaid >= 0 ? '+' : ''}
                    {selectedStats.rentCollected - selectedStats.rentPaid}만원
                  </span>
                </div>
              </div>

              {/* 황금열쇠 */}
              <div
                className="rounded-lg"
                style={{ background: 'rgba(255,255,255,0.8)', padding: '8px 10px' }}
              >
                <div className="font-bold mb-1" style={{ fontSize: 11, color: '#37474F' }}>
                  🔑 황금열쇠 ({selectedStats.goldenKeyEvents.length}회)
                </div>
                {selectedStats.goldenKeyEvents.length > 0 ? (
                  <div
                    style={{
                      maxHeight: 100,
                      overflowY: 'auto',
                      scrollbarWidth: 'thin',
                    }}
                  >
                    {selectedStats.goldenKeyEvents.map((evt, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 9,
                          color: '#546E7A',
                          padding: '1px 0',
                          borderBottom: '1px solid #F5F5F5',
                        }}
                      >
                        {evt}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: 9, color: '#BDBDBD' }}>없음</div>
                )}
              </div>
            </motion.div>
          )}

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
