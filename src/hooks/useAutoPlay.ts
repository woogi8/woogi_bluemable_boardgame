'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { BOARD_TILES } from '@/lib/boardData';

const AUTO_DELAY = 400; // ms between actions

export function useAutoPlay() {
  const autoPlay = useGameStore((s) => s.autoPlay);
  const phase = useGameStore((s) => s.phase);
  const modal = useGameStore((s) => s.modal);
  const screen = useGameStore((s) => s.screen);
  const rolling = useGameStore((s) => s.rolling);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Game over -> auto off
  useEffect(() => {
    if (screen === 'over' && autoPlay) {
      useGameStore.getState().toggleAutoPlay();
    }
  }, [screen, autoPlay]);

  useEffect(() => {
    if (!autoPlay || screen !== 'playing') return;

    // Clear any pending timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const store = useGameStore.getState();

    // Don't act while dice are rolling
    if (rolling) return;

    timerRef.current = setTimeout(() => {
      const s = useGameStore.getState();
      if (!s.autoPlay || s.screen !== 'playing') return;

      // Phase: roll -> roll dice
      if (s.phase === 'roll' && !s.rolling) {
        s.rollDiceAction();
        return;
      }

      // Phase: done -> end turn
      if (s.phase === 'done') {
        s.endTurn();
        return;
      }

      // Phase: action -> handle modal
      if (s.phase === 'action' && s.modal) {
        const player = s.players[s.currentPlayerIndex];

        switch (s.modal.type) {
          case 'buy': {
            const tile = BOARD_TILES[s.modal.tileId];
            // Buy if we keep at least 50% of money after purchase
            if (player.money >= tile.price * 2) {
              s.buyProperty(s.modal.tileId);
            } else {
              s.skipBuy();
            }
            break;
          }
          case 'build': {
            // Build if we keep at least 50% of money after construction
            if (player.money >= s.modal.cost * 2) {
              s.buildOnProperty(s.modal.tileId);
            } else {
              s.skipBuild();
            }
            break;
          }
          case 'rent': {
            s.payRent();
            break;
          }
          case 'pass': {
            // Always use free pass
            s.useFreePass();
            break;
          }
          case 'chance': {
            s.executeCard(s.modal.card);
            break;
          }
        }
      }
    }, AUTO_DELAY);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoPlay, phase, modal, screen, rolling]);
}
