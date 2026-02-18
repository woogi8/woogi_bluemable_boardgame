'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { PLAYER_COLORS, PLAYER_TOKENS } from '@/types/game';

export default function GameLobby() {
  const playerCount = useGameStore((s) => s.playerCount);
  const setPlayerCount = useGameStore((s) => s.setPlayerCount);
  const startGame = useGameStore((s) => s.startGame);

  const [names, setNames] = useState<string[]>(['', '', '', '']);

  // 플레이어 수 변경 시 포커스 안내
  useEffect(() => {
    // 이름이 비어있으면 기본값 유지
  }, [playerCount]);

  const updateName = (index: number, value: string) => {
    setNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleStart = () => {
    startGame(names.slice(0, playerCount));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: "url('/main_page.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1B5E20',
        fontFamily: "'Noto Sans KR', 'Segoe UI', sans-serif",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center rounded-2xl max-w-[400px] w-full"
        style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '36px 44px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
        }}
      >
        {/* 타이틀 */}
        <div
          className="font-semibold tracking-widest"
          style={{ fontSize: 13, color: '#2E7D32', marginBottom: 4 }}
        >
          SINCE 1982
        </div>
        <h1
          className="font-black"
          style={{
            fontSize: 35,
            color: '#1B5E20',
            marginBottom: 2,
            letterSpacing: 4,
          }}
        >
          부루마블
        </h1>
        <p
          className="font-bold tracking-widest"
          style={{ fontSize: 14, color: '#388E3C', marginBottom: 6 }}
        >
          GAME
        </p>

        {/* 설명 */}
        <p
          style={{
            fontSize: 10,
            color: '#78909C',
            marginBottom: 16,
            lineHeight: 1.7,
          }}
        >
          🌍 실제 보드 40칸 원판 완벽 재현
          <br />
          🔑 황금열쇠 30장 (반액대매출/우대권/탈출권)
          <br />
          🇰🇷 서울(100만)/부산(25만)/제주도(20만)
          <br />
          ✈️ 콩코드(20)/🚢 퀸엘리자베스(25)/🚀 컬럼비아(45)
          <br />
          🛸 우주여행/🏝️ 무인도/💰 사회복지기금(납부/수령)
        </p>

        {/* 플레이어 수 선택 */}
        <div className="mb-5">
          <label
            className="font-bold block mb-2"
            style={{ fontSize: 14, color: '#37474F' }}
          >
            플레이어 수
          </label>
          <div className="flex gap-2 justify-center">
            {[2, 3, 4].map((n) => (
              <motion.button
                key={n}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlayerCount(n)}
                className="font-bold cursor-pointer"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  border:
                    playerCount === n
                      ? '3px solid #1B5E20'
                      : '2px solid #E0E0E0',
                  background: playerCount === n ? '#E8F5E9' : '#fff',
                  fontSize: 19,
                  color: playerCount === n ? '#1B5E20' : '#90A4AE',
                }}
              >
                {n}명
              </motion.button>
            ))}
          </div>
        </div>

        {/* 플레이어 이름 입력 */}
        <div className="mb-5 flex flex-col gap-2 items-center">
          {Array.from({ length: playerCount }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 w-full max-w-[260px]"
            >
              <div
                className="flex items-center justify-center shrink-0 rounded-lg"
                style={{
                  width: 36,
                  height: 36,
                  background: `${PLAYER_COLORS[i]}15`,
                  border: `2px solid ${PLAYER_COLORS[i]}`,
                }}
              >
                <span style={{ fontSize: 17 }}>{PLAYER_TOKENS[i]}</span>
              </div>
              <input
                type="text"
                placeholder={`P${i + 1}`}
                value={names[i]}
                onChange={(e) => updateName(i, e.target.value)}
                maxLength={8}
                className="flex-1 rounded-lg font-semibold outline-none"
                style={{
                  height: 36,
                  padding: '0 12px',
                  fontSize: 14,
                  color: PLAYER_COLORS[i],
                  border: `2px solid ${names[i] ? PLAYER_COLORS[i] : '#E0E0E0'}`,
                  background: names[i] ? `${PLAYER_COLORS[i]}08` : '#fff',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = PLAYER_COLORS[i];
                }}
                onBlur={(e) => {
                  if (!names[i]) e.target.style.borderColor = '#E0E0E0';
                }}
              />
            </motion.div>
          ))}
          <p style={{ fontSize: 10, color: '#B0BEC5', marginTop: 2 }}>
            비워두면 P1, P2... 로 자동 설정
          </p>
        </div>

        {/* 시작 버튼 */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="font-extrabold text-white border-none cursor-pointer tracking-widest"
          style={{
            padding: '12px 40px',
            fontSize: 17,
            background: 'linear-gradient(135deg, #1B5E20, #4CAF50)',
            borderRadius: 10,
            letterSpacing: 2,
            boxShadow: '0 4px 12px rgba(27,94,32,0.4)',
          }}
        >
          🎮 게임 시작
        </motion.button>

        <Link
          href="/rules"
          target="_blank"
          style={{
            display: 'inline-block',
            marginTop: 12,
            fontSize: 13,
            fontWeight: 600,
            color: '#66BB6A',
            textDecoration: 'none',
          }}
        >
          📖 게임 설명서 보기
        </Link>
      </motion.div>
    </div>
  );
}
