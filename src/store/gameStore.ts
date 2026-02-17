import { create } from 'zustand';
import {
  Player,
  GoldenKeyCard,
  DiceResult,
  GamePhase,
  GameScreen,
  ModalType,
  OwnershipMap,
  BuildingMap,
  LogEntry,
  BOARD_SIZE,
  SALARY,
  INITIAL_MONEY,
  WELFARE_PAYMENT,
  MAX_ISLAND_TURNS,
  TRANSPORT_IDS,
} from '@/types/game';
import { BOARD_TILES } from '@/lib/boardData';
import { GOLDEN_KEY_CARDS } from '@/lib/goldenKeyData';
import { rollDice } from '@/lib/diceUtils';
import {
  getNextPlayerIndex,
  checkGameOver,
  calculateRent,
  getBuildCost,
  processBankruptcy,
  executeGoldenKeyCard,
} from '@/lib/gameEngine';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface GameStore {
  // 게임 화면
  screen: GameScreen;

  // 플레이어
  playerCount: number;
  players: Player[];
  currentPlayerIndex: number;

  // 주사위
  dice: [number, number];
  rolling: boolean;
  doubleCount: number;

  // 게임 진행
  phase: GamePhase;
  modal: ModalType;
  message: string;

  // 보드 상태
  ownership: OwnershipMap;
  buildings: BuildingMap;
  welfareFund: number;

  // 황금열쇠 덱
  deck: GoldenKeyCard[];

  // 로그
  logs: LogEntry[];

  // 액션
  setPlayerCount: (count: number) => void;
  startGame: (names: string[]) => void;
  rollDiceAction: () => void;
  endTurn: () => void;
  buyProperty: (tileId: number) => void;
  skipBuy: () => void;
  buildOnProperty: (tileId: number) => void;
  skipBuild: () => void;
  executeCard: (card: GoldenKeyCard) => void;
  useFreePass: () => void;
  payRent: () => void;
  resetGame: () => void;
}

const addLog = (logs: LogEntry[], message: string): LogEntry[] => [
  ...logs.slice(-80),
  { message, timestamp: Date.now() },
];

export const useGameStore = create<GameStore>((set, get) => ({
  screen: 'lobby',
  playerCount: 2,
  players: [],
  currentPlayerIndex: 0,
  dice: [1, 1],
  rolling: false,
  doubleCount: 0,
  phase: 'roll',
  modal: null,
  message: '',
  ownership: {},
  buildings: {},
  welfareFund: 0,
  deck: [],
  logs: [],

  setPlayerCount: (count) => set({ playerCount: count }),

  startGame: (names: string[]) => {
    const { playerCount } = get();
    // 턴 순서를 랜덤으로 섞기
    const orderIndices = shuffle(Array.from({ length: playerCount }, (_, i) => i));
    const players: Player[] = orderIndices.map((origIdx, newIdx) => ({
      id: newIdx,
      name: names[origIdx]?.trim() || `P${origIdx + 1}`,
      money: INITIAL_MONEY,
      position: 0,
      islandTurns: 0,
      bankrupt: false,
      freePass: 0,
      escapeCard: 0,
      lapsCompleted: 0,
    }));

    const orderMsg = players.map((p, i) => `${i + 1}번: ${p.name}`).join(', ');
    set({
      screen: 'playing',
      players,
      currentPlayerIndex: 0,
      dice: [1, 1],
      rolling: false,
      doubleCount: 0,
      phase: 'roll',
      modal: null,
      message: `🎮 게임 시작! 순서: ${orderMsg}`,
      ownership: {},
      buildings: {},
      welfareFund: 0,
      deck: shuffle(GOLDEN_KEY_CARDS),
      logs: [
        { message: '🎮 부루마블 시작! (원판 40칸)', timestamp: Date.now() },
        { message: `🎲 턴 순서: ${orderMsg}`, timestamp: Date.now() },
      ],
    });
  },

  rollDiceAction: () => {
    const state = get();
    if (state.phase !== 'roll' || state.rolling) return;

    set({ rolling: true });

    // 주사위 애니메이션 (빠른 변경 후 최종 결과)
    let count = 0;
    const interval = setInterval(() => {
      set({
        dice: [
          Math.ceil(Math.random() * 6),
          Math.ceil(Math.random() * 6),
        ] as [number, number],
      });
      count++;

      if (count > 8) {
        clearInterval(interval);
        const result = rollDice();
        const { players, currentPlayerIndex, ownership, buildings, doubleCount, welfareFund } = get();
        const player = players[currentPlayerIndex];

        set({
          dice: [result.die1, result.die2] as [number, number],
          rolling: false,
        });

        let newLogs = addLog(
          get().logs,
          `🎲 ${player.name}: [${result.die1}][${result.die2}]=${result.total}${result.isDouble ? ' 더블!' : ''}`
        );

        // 무인도에 갇혀있는 경우
        if (player.islandTurns > 0) {
          if (result.isDouble) {
            // 더블로 탈출
            const newPlayers = players.map((p) =>
              p.id === player.id ? { ...p, islandTurns: 0 } : p
            );
            newLogs = addLog(newLogs, `🎉 ${player.name} 더블 탈출!`);
            set({ players: newPlayers, logs: newLogs, message: '🎉 더블 탈출!' });

            // 탈출 후 이동
            setTimeout(() => {
              const { players: ps, ownership: ow, buildings: bl } = get();
              const p = ps[currentPlayerIndex];
              const newPos = (10 + result.total) % BOARD_SIZE;
              const salary = newPos < 10 ? SALARY : 0;
              const movedPlayers = ps.map((x) =>
                x.id === p.id
                  ? { ...x, position: newPos, money: x.money + salary }
                  : x
              );
              let logs2 = get().logs;
              if (salary) logs2 = addLog(logs2, `💵 +${SALARY} 월급`);
              set({ players: movedPlayers, logs: logs2 });

              setTimeout(() => {
                handleLanding(
                  movedPlayers[currentPlayerIndex],
                  BOARD_TILES[newPos],
                  movedPlayers,
                  ow,
                  bl
                );
              }, 300);
            }, 300);
          } else {
            // 탈출 실패
            const newPlayers = players.map((p) =>
              p.id === player.id
                ? { ...p, islandTurns: Math.max(0, p.islandTurns - 1) }
                : p
            );
            const remaining = newPlayers[player.id].islandTurns;
            set({
              players: newPlayers,
              logs: newLogs,
              message: remaining > 0
                ? `🏝️ 남은: ${remaining}턴`
                : '⏰ 대기 종료',
              phase: 'done',
            });
          }
          return;
        }

        // 3 더블 → 무인도
        if (result.isDouble && doubleCount >= 2) {
          const newPlayers = players.map((p) =>
            p.id === player.id
              ? { ...p, position: 10, islandTurns: MAX_ISLAND_TURNS }
              : p
          );
          newLogs = addLog(newLogs, `🚔 ${player.name}: 3더블→무인도!`);
          set({
            players: newPlayers,
            doubleCount: 0,
            logs: newLogs,
            message: '🚔 3더블→무인도!',
            phase: 'done',
          });
          return;
        }

        if (result.isDouble) {
          set({ doubleCount: doubleCount + 1 });
        } else {
          set({ doubleCount: 0 });
        }

        // 이동
        const oldPos = player.position;
        const newPos = (oldPos + result.total) % BOARD_SIZE;
        const passedStart = newPos < oldPos && oldPos !== 0;
        const salary = passedStart ? SALARY : 0;

        const newPlayers = players.map((p) =>
          p.id === player.id
            ? { ...p, position: newPos, money: p.money + salary }
            : p
        );
        if (salary) {
          newLogs = addLog(newLogs, `💵 ${player.name}: +${SALARY} 월급`);
        }

        set({
          players: newPlayers,
          logs: newLogs,
          message: `${player.name}→${BOARD_TILES[newPos].name}`,
        });

        // 착지 처리
        setTimeout(() => {
          handleLanding(
            { ...player, position: newPos, money: player.money + salary },
            BOARD_TILES[newPos],
            newPlayers,
            ownership,
            buildings
          );
        }, 300);
      }
    }, 80);

    function handleLanding(
      player: Player,
      tile: (typeof BOARD_TILES)[number],
      allPlayers: Player[],
      ow: OwnershipMap,
      bl: BuildingMap
    ) {
      const store = get();

      // 무인도
      if (tile.type === 'deserted_island') {
        if (player.escapeCard > 0) {
          const newPlayers = allPlayers.map((p) =>
            p.id === player.id ? { ...p, escapeCard: p.escapeCard - 1 } : p
          );
          const newLogs = addLog(store.logs, `📻 ${player.name}: 탈출권 사용!`);
          set({
            players: newPlayers,
            logs: newLogs,
            message: '📻 탈출권 사용!',
            phase: 'done',
          });
          return;
        }
        const newPlayers = allPlayers.map((p) =>
          p.id === player.id ? { ...p, islandTurns: MAX_ISLAND_TURNS } : p
        );
        const newLogs = addLog(store.logs, `🏝️ ${player.name}→무인도`);
        set({
          players: newPlayers,
          logs: newLogs,
          message: `🏝️ 무인도!`,
          phase: 'done',
        });
        return;
      }

      // 사회복지기금 접수처
      if (tile.type === 'welfare_pay') {
        const newPlayers = allPlayers.map((p) =>
          p.id === player.id
            ? { ...p, money: p.money - WELFARE_PAYMENT }
            : p
        );
        if (newPlayers[player.id].money < 0) {
          const result = processBankruptcy(player.id, newPlayers, ow);
          const newLogs = addLog(
            store.logs,
            `💰 ${player.name}: 기금-${WELFARE_PAYMENT} → 파산!`
          );
          set({
            players: result.players,
            ownership: result.ownership,
            logs: newLogs,
            message: `💰 사회기금 -${WELFARE_PAYMENT}만원 → 파산!`,
            phase: 'done',
          });
          checkAndHandleGameOver(result.players);
          return;
        }
        const newLogs = addLog(
          store.logs,
          `💰 ${player.name}: 기금-${WELFARE_PAYMENT}`
        );
        set({
          players: newPlayers,
          welfareFund: store.welfareFund + WELFARE_PAYMENT,
          logs: newLogs,
          message: `💰 사회기금 -${WELFARE_PAYMENT}만원`,
          phase: 'done',
        });
        return;
      }

      // 황금열쇠
      if (tile.type === 'golden_key') {
        let deck = [...store.deck];
        if (deck.length === 0) deck = shuffle(GOLDEN_KEY_CARDS);
        const card = deck.shift()!;
        set({
          deck,
          message: `🔑 ${card.text}`,
          modal: { type: 'chance', card },
          phase: 'action',
        });
        return;
      }

      // 출발
      if (tile.type === 'start') {
        set({ phase: 'done' });
        return;
      }

      // 우주여행 (30번) - 랜덤 위치로 이동
      if (tile.type === 'space_travel') {
        const columbiaOwner = ow[32];
        let cost = 0;
        if (columbiaOwner !== undefined && columbiaOwner !== player.id) {
          cost = BOARD_TILES[32].rent[0];
        }
        const dest = Math.floor(Math.random() * BOARD_SIZE);
        const newPlayers = allPlayers.map((p) => {
          if (p.id === player.id)
            return { ...p, position: dest, money: p.money - cost };
          if (p.id === columbiaOwner && columbiaOwner !== player.id)
            return { ...p, money: p.money + cost };
          return p;
        });
        const newLogs = addLog(
          store.logs,
          `🛸 ${player.name}→${BOARD_TILES[dest].name}${cost ? ` (컬럼비아 -${cost})` : ''}`
        );
        set({
          players: newPlayers,
          logs: newLogs,
          message: `🛸 우주여행→${BOARD_TILES[dest].name}!`,
        });
        setTimeout(() => {
          handleLanding(
            { ...player, position: dest, money: player.money - cost },
            BOARD_TILES[dest],
            newPlayers,
            ow,
            bl
          );
        }, 400);
        return;
      }

      // 사회복지기금 수령처 (20번 칸)
      if (tile.type === 'welfare_receive') {
        const amount = store.welfareFund;
        if (amount > 0) {
          const newPlayers = allPlayers.map((p) =>
            p.id === player.id ? { ...p, money: p.money + amount } : p
          );
          const newLogs = addLog(
            store.logs,
            `💰 ${player.name}: 사회복지기금 +${amount}만원 수령!`
          );
          set({
            players: newPlayers,
            welfareFund: 0,
            logs: newLogs,
            message: `💰 사회복지기금 ${amount}만원 수령!`,
            phase: 'done',
          });
        } else {
          const newLogs = addLog(
            store.logs,
            `💰 ${player.name}: 기금이 비어있음`
          );
          set({
            logs: newLogs,
            message: '💰 사회복지기금이 비어있습니다',
            phase: 'done',
          });
        }
        return;
      }

      // 도시/교통수단
      if (tile.type === 'city' || tile.type === 'transport') {
        const ownerId = ow[tile.id];

        // 주인 없음 → 구매 가능
        if (ownerId === undefined) {
          if (player.money >= tile.price) {
            set({
              modal: { type: 'buy', tileId: tile.id },
              phase: 'action',
            });
          } else {
            set({ message: '💸 자금 부족!', phase: 'done' });
          }
          return;
        }

        // 본인 소유 → 건설
        if (ownerId === player.id) {
          if (tile.type === 'transport' || tile.id === 39) {
            set({ message: `${tile.name}: 건설 불가`, phase: 'done' });
            return;
          }
          const currentLevel = bl[tile.id] || 0;
          if (currentLevel < 3) {
            const cost = getBuildCost(tile.id);
            if (player.money >= cost) {
              set({
                modal: {
                  type: 'build',
                  tileId: tile.id,
                  cost,
                  currentLevel,
                },
                phase: 'action',
              });
            } else {
              set({ message: '건설 자금 부족!', phase: 'done' });
            }
          } else {
            set({ message: '최대 건설!', phase: 'done' });
          }
          return;
        }

        // 타인 소유 → 통행료
        const rent = calculateRent(tile.id, ow, bl);

        // 우대권 확인
        if (player.freePass > 0) {
          set({
            modal: { type: 'pass', tileId: tile.id, ownerId, rent },
            phase: 'action',
          });
          return;
        }

        // 통행료 지불
        const newPlayers = allPlayers.map((p) => {
          if (p.id === player.id)
            return { ...p, money: p.money - rent };
          if (p.id === ownerId)
            return { ...p, money: p.money + rent };
          return p;
        });

        if (newPlayers[player.id].money < 0) {
          // 파산 처리 - 통행료 중 지불 가능한 만큼만 전달
          const payable = allPlayers[player.id].money;
          const bankruptPlayers = allPlayers.map((p) => {
            if (p.id === ownerId)
              return { ...p, money: p.money + payable };
            return p;
          });
          const result = processBankruptcy(player.id, bankruptPlayers, ow);
          const newLogs = addLog(store.logs, `💀 ${player.name} 파산!`);
          set({
            players: result.players,
            ownership: result.ownership,
            logs: newLogs,
            message: '💸 파산!',
            phase: 'done',
          });
          checkAndHandleGameOver(result.players);
        } else {
          const newLogs = addLog(
            store.logs,
            `💸 ${player.name}→${allPlayers[ownerId].name}: ${rent}만원`
          );
          set({
            players: newPlayers,
            logs: newLogs,
            message: `💸 ${player.name}→${allPlayers[ownerId].name}: ${rent}만원`,
            phase: 'done',
          });
        }
        return;
      }

      set({ phase: 'done' });
    }

    function checkAndHandleGameOver(players: Player[]) {
      const winner = checkGameOver(players);
      if (winner) {
        const newLogs = addLog(get().logs, `🏆 ${winner.name} 승리!`);
        set({
          screen: 'over',
          message: `🏆 ${winner.name} 승리!`,
          logs: newLogs,
        });
      }
    }
  },

  endTurn: () => {
    const { dice, players, currentPlayerIndex } = get();
    const player = players[currentPlayerIndex];

    // 더블이면 한 번 더
    if (
      dice[0] === dice[1] &&
      !player.bankrupt &&
      player.islandTurns === 0
    ) {
      set({
        message: `🎲 더블! ${player.name} 한 번 더!`,
        phase: 'roll',
        modal: null,
      });
      return;
    }

    const next = getNextPlayerIndex(players, currentPlayerIndex);
    set({
      currentPlayerIndex: next,
      doubleCount: 0,
      phase: 'roll',
      modal: null,
      message: `🎲 ${players[next].name}의 차례`,
    });
  },

  buyProperty: (tileId) => {
    const { players, currentPlayerIndex, ownership, logs } = get();
    const player = players[currentPlayerIndex];
    const tile = BOARD_TILES[tileId];

    const newPlayers = players.map((p) =>
      p.id === player.id ? { ...p, money: p.money - tile.price } : p
    );
    const newLogs = addLog(
      logs,
      `🏢 ${player.name}: ${tile.name} (-${tile.price})`
    );

    set({
      players: newPlayers,
      ownership: { ...ownership, [tileId]: player.id },
      logs: newLogs,
      modal: null,
      phase: 'done',
    });
  },

  skipBuy: () => {
    set({ modal: null, phase: 'done' });
  },

  buildOnProperty: (tileId) => {
    const { players, currentPlayerIndex, buildings, logs } = get();
    const player = players[currentPlayerIndex];
    const cost = getBuildCost(tileId);
    const currentLevel = buildings[tileId] || 0;
    const newLevel = currentLevel + 1;
    const levelName = newLevel >= 3 ? '호텔' : newLevel === 2 ? '빌딩' : '별장';

    const newPlayers = players.map((p) =>
      p.id === player.id ? { ...p, money: p.money - cost } : p
    );
    const newLogs = addLog(
      logs,
      `🏗️ ${player.name}: ${BOARD_TILES[tileId].name} ${levelName} (-${cost})`
    );

    set({
      players: newPlayers,
      buildings: { ...buildings, [tileId]: newLevel },
      logs: newLogs,
      modal: null,
      phase: 'done',
    });
  },

  skipBuild: () => {
    set({ modal: null, phase: 'done' });
  },

  executeCard: (card) => {
    const {
      players,
      currentPlayerIndex,
      ownership,
      buildings,
      welfareFund,
      logs,
    } = get();

    const result = executeGoldenKeyCard(
      card,
      currentPlayerIndex,
      players,
      ownership,
      buildings,
      welfareFund
    );

    const newLogs = addLog(logs, result.message);

    set({
      players: result.players,
      ownership: result.ownership,
      buildings: result.buildings,
      welfareFund: result.welfareFund,
      logs: newLogs,
      modal: null,
    });

    // 게임 오버 체크
    const winner = checkGameOver(result.players);
    if (winner) {
      const overLogs = addLog(newLogs, `🏆 ${winner.name} 승리!`);
      set({ screen: 'over', message: `🏆 ${winner.name} 승리!`, logs: overLogs });
      return;
    }

    // 이동이 필요한 카드 (goTo, moveBack)
    if (result.needsLanding) {
      // needsLanding 처리는 store 내부에서 handleLanding 호출이 필요
      // rollDiceAction 내부의 handleLanding 을 재사용하기 어려우므로
      // 여기서는 간단히 phase: 'done' 으로 처리
      // (goTo의 경우 도착지의 추가 효과는 간소화 처리)
      set({ phase: 'done' });
    } else {
      set({ phase: 'done' });
    }
  },

  useFreePass: () => {
    const { players, currentPlayerIndex, logs, modal } = get();
    if (!modal || modal.type !== 'pass') return;

    const player = players[currentPlayerIndex];
    const newPlayers = players.map((p) =>
      p.id === player.id ? { ...p, freePass: p.freePass - 1 } : p
    );
    const newLogs = addLog(
      logs,
      `🎫 ${player.name}: 우대권 사용! (${modal.rent}만원 면제)`
    );

    set({
      players: newPlayers,
      logs: newLogs,
      modal: null,
      phase: 'done',
    });
  },

  payRent: () => {
    const { players, currentPlayerIndex, ownership, buildings, logs, modal } =
      get();
    if (!modal || modal.type !== 'pass') return;

    const player = players[currentPlayerIndex];
    const { ownerId, rent } = modal;

    const newPlayers = players.map((p) => {
      if (p.id === player.id) return { ...p, money: p.money - rent };
      if (p.id === ownerId) return { ...p, money: p.money + rent };
      return p;
    });

    if (newPlayers[player.id].money < 0) {
      const payable = players[player.id].money;
      const bankruptPlayers = players.map((p) => {
        if (p.id === ownerId) return { ...p, money: p.money + payable };
        return p;
      });
      const result = processBankruptcy(player.id, bankruptPlayers, ownership);
      const newLogs = addLog(logs, `💀 ${player.name} 파산!`);
      set({
        players: result.players,
        ownership: result.ownership,
        logs: newLogs,
        modal: null,
        message: '💸 파산!',
        phase: 'done',
      });

      const winner = checkGameOver(result.players);
      if (winner) {
        const overLogs = addLog(newLogs, `🏆 ${winner.name} 승리!`);
        set({
          screen: 'over',
          message: `🏆 ${winner.name} 승리!`,
          logs: overLogs,
        });
      }
    } else {
      const newLogs = addLog(
        logs,
        `💸 ${player.name}→${players[ownerId].name}: ${rent}만원`
      );
      set({
        players: newPlayers,
        logs: newLogs,
        modal: null,
        phase: 'done',
      });
    }
  },

  resetGame: () => {
    set({
      screen: 'lobby',
      players: [],
      currentPlayerIndex: 0,
      dice: [1, 1],
      rolling: false,
      doubleCount: 0,
      phase: 'roll',
      modal: null,
      message: '',
      ownership: {},
      buildings: {},
      welfareFund: 0,
      deck: [],
      logs: [],
    });
  },
}));
