'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';

export default function GameLog() {
  const logs = useGameStore((s) => s.logs);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      ref={logRef}
      className="rounded-lg p-1.5 overflow-y-auto"
      style={{
        background: 'rgba(0,0,0,0.6)',
        maxHeight: 140,
        scrollbarWidth: 'thin',
      }}
    >
      <div className="font-bold mb-0.5" style={{ fontSize: 9, color: '#81C784' }}>
        📜 로그
      </div>
      {logs.map((log, i) => (
        <div
          key={i}
          style={{
            fontSize: 9,
            color: '#E0E0E0',
            lineHeight: 1.4,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: 1,
            marginBottom: 1,
          }}
        >
          {log.message}
        </div>
      ))}
    </div>
  );
}
