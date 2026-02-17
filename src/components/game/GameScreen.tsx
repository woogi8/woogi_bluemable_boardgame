'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Board from '../board/Board';
import PlayerPanel from '../ui/PlayerPanel';
import GameLog from '../ui/GameLog';
import PropertyMap from '../ui/PropertyMap';
import GameResult from './GameResult';
import { useGameStore } from '@/store/gameStore';
import { useAutoPlay } from '@/hooks/useAutoPlay';

// 화면 높이 기준으로 기본 셀 크기 계산
function getDefaultCellSize() {
  if (typeof window === 'undefined') return 80;
  // 보드 = 11셀 + gap/border ≈ 11*cellSize + 20
  // 상단 메시지 바 + 여백 ≈ 60px
  const available = window.innerHeight - 80;
  const ideal = Math.floor(available / 11.5);
  return Math.min(Math.max(ideal, 50), 110);
}

export default function GameScreen() {
  const message = useGameStore((s) => s.message);
  const resetGame = useGameStore((s) => s.resetGame);
  const autoPlay = useGameStore((s) => s.autoPlay);
  const toggleAutoPlay = useGameStore((s) => s.toggleAutoPlay);

  useAutoPlay();

  const [cellSize, setCellSize] = useState(80);

  // 초기 화면 크기에 맞게 기본값 설정
  useEffect(() => {
    setCellSize(getDefaultCellSize());
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center p-2.5"
      style={{
        background: 'linear-gradient(135deg, #1B5E20, #2E7D32 50%, #388E3C)',
        fontFamily: "'Noto Sans KR', 'Segoe UI', sans-serif",
      }}
    >
      {/* 상단 바: 메시지 + 크기 조절 */}
      <div className="flex items-center gap-3 mb-2 w-full justify-center flex-wrap">
        <div
          className="rounded-lg px-4 py-1.5 text-center font-semibold flex-1 max-w-[660px]"
          style={{
            background: 'rgba(255,255,255,0.93)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            fontSize: 12,
            color: '#37474F',
          }}
        >
          {message}
        </div>

        {/* 보드 크기 조절 */}
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 shrink-0"
          style={{
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          <button
            onClick={() => setCellSize((s) => Math.max(40, s - 8))}
            className="font-bold text-white border-none rounded cursor-pointer"
            style={{
              width: 24,
              height: 24,
              fontSize: 14,
              background: '#607D8B',
              lineHeight: '24px',
            }}
          >
            −
          </button>
          <input
            type="range"
            min={40}
            max={110}
            step={2}
            value={cellSize}
            onChange={(e) => setCellSize(Number(e.target.value))}
            className="w-[80px] accent-green-700"
            style={{ cursor: 'pointer' }}
          />
          <button
            onClick={() => setCellSize((s) => Math.min(110, s + 8))}
            className="font-bold text-white border-none rounded cursor-pointer"
            style={{
              width: 24,
              height: 24,
              fontSize: 14,
              background: '#607D8B',
              lineHeight: '24px',
            }}
          >
            +
          </button>
          <span
            className="font-semibold"
            style={{ fontSize: 10, color: '#546E7A', minWidth: 28 }}
          >
            {cellSize}px
          </span>
        </div>
      </div>

      {/* 보드 + 사이드패널 */}
      <div className="flex gap-2.5 items-start flex-wrap justify-center">
        {/* 왼쪽: 플레이어 + 로그 */}
        <div className="flex flex-col gap-1.5 w-[200px]">
          <PlayerPanel />
          <GameLog />
          <button
            onClick={toggleAutoPlay}
            className="py-1.5 px-3 font-bold text-white border-none rounded-md cursor-pointer"
            style={{
              fontSize: 11,
              background: autoPlay ? '#E53935' : '#78909C',
              animation: autoPlay ? 'pulse 1.5s infinite' : 'none',
            }}
          >
            {autoPlay ? '⏸ Auto OFF' : '▶ Auto ON'}
          </button>
          <button
            onClick={resetGame}
            className="py-1.5 px-3 font-bold text-white border-none rounded-md cursor-pointer"
            style={{ fontSize: 11, background: '#455A64' }}
          >
            🔄 새게임
          </button>
          <Link
            href="/rules"
            target="_blank"
            className="block text-center py-1.5 px-3 font-bold border-none rounded-md cursor-pointer"
            style={{
              fontSize: 11,
              background: '#66BB6A',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            📖 설명서
          </Link>
        </div>

        {/* 중앙: 보드 */}
        <Board cellSize={cellSize} />

        {/* 오른쪽: 부동산 현황 */}
        <div className="w-[160px]">
          <PropertyMap />
        </div>
      </div>

      <GameResult />
    </div>
  );
}
