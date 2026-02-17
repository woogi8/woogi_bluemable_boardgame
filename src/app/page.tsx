'use client';

import { useGameStore } from '@/store/gameStore';
import GameLobby from '@/components/game/GameLobby';
import GameScreen from '@/components/game/GameScreen';

export default function Home() {
  const screen = useGameStore((s) => s.screen);

  if (screen === 'lobby') {
    return <GameLobby />;
  }

  return <GameScreen />;
}
