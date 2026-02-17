import {
  Player,
  GoldenKeyCard,
  OwnershipMap,
  BuildingMap,
  BOARD_SIZE,
  SALARY,
  WELFARE_PAYMENT,
  TRANSPORT_IDS,
} from '@/types/game';
import { BOARD_TILES } from './boardData';

// 다음 살아있는 플레이어 인덱스
export function getNextPlayerIndex(players: Player[], current: number): number {
  let next = (current + 1) % players.length;
  let safety = 0;
  while (players[next].bankrupt && safety < players.length) {
    next = (next + 1) % players.length;
    safety++;
  }
  return next;
}

// 게임 종료 체크 (생존자 1명)
export function checkGameOver(players: Player[]): Player | null {
  const alive = players.filter((p) => !p.bankrupt);
  return alive.length <= 1 ? alive[0] ?? null : null;
}

// 플레이어 이동 후 새 위치 + 월급 여부
export function calculateNewPosition(
  currentPos: number,
  steps: number
): { newPosition: number; passedStart: boolean } {
  const newPosition = (currentPos + steps) % BOARD_SIZE;
  const passedStart = newPosition < currentPos && currentPos !== 0;
  return { newPosition, passedStart };
}

// 통행료 계산
export function calculateRent(
  tileId: number,
  ownership: OwnershipMap,
  buildings: BuildingMap
): number {
  const tile = BOARD_TILES[tileId];
  if (!tile) return 0;

  const ownerId = ownership[tileId];
  if (ownerId === undefined) return 0;

  if (tile.type === 'transport') {
    // 교통수단: 소유 개수에 비례
    const ownedCount = TRANSPORT_IDS.filter(
      (tid) => ownership[tid] === ownerId
    ).length;
    return tile.rent[0] * ownedCount;
  }

  // 도시: 건물 단계별 통행료
  const level = buildings[tileId] || 0;
  return tile.rent[Math.min(level, tile.rent.length - 1)];
}

// 건물 건설 비용 (땅 가격의 50%)
export function getBuildCost(tileId: number): number {
  return Math.floor(BOARD_TILES[tileId].price * 0.5);
}

// 파산 처리
export function processBankruptcy(
  playerId: number,
  players: Player[],
  ownership: OwnershipMap
): { players: Player[]; ownership: OwnershipMap } {
  const newPlayers = players.map((p) =>
    p.id === playerId ? { ...p, bankrupt: true, money: 0 } : p
  );
  const newOwnership = { ...ownership };
  Object.keys(newOwnership).forEach((key) => {
    if (newOwnership[Number(key)] === playerId) {
      delete newOwnership[Number(key)];
    }
  });
  return { players: newPlayers, ownership: newOwnership };
}

// 가장 비싼 자산 찾기 (반액대매출용)
export function findMostExpensiveProperty(
  playerId: number,
  ownership: OwnershipMap,
  buildings: BuildingMap
): { tileId: number | null; value: number } {
  let maxValue = -1;
  let maxTileId: number | null = null;

  Object.entries(ownership).forEach(([tileIdStr, ownerId]) => {
    if (ownerId === playerId) {
      const tileId = Number(tileIdStr);
      const tile = BOARD_TILES[tileId];
      const buildLevel = buildings[tileId] || 0;
      const value = tile.price + buildLevel * Math.floor(tile.price * 0.5);
      if (value > maxValue) {
        maxValue = value;
        maxTileId = tileId;
      }
    }
  });

  return { tileId: maxTileId, value: maxValue };
}

// 보유 건물 수 세기
export function countBuildings(
  playerId: number,
  ownership: OwnershipMap,
  buildings: BuildingMap
): number {
  let total = 0;
  Object.entries(buildings).forEach(([tileIdStr, level]) => {
    if (ownership[Number(tileIdStr)] === playerId) {
      total += level;
    }
  });
  return total;
}

// 황금열쇠 카드 실행 결과
export interface CardResult {
  players: Player[];
  ownership: OwnershipMap;
  buildings: BuildingMap;
  welfareFund: number;
  message: string;
  // 이동이 필요한 경우 (goTo 등) - 착지 처리를 별도로 해야 함
  needsLanding?: { playerId: number; position: number };
}

export function executeGoldenKeyCard(
  card: GoldenKeyCard,
  playerId: number,
  players: Player[],
  ownership: OwnershipMap,
  buildings: BuildingMap,
  welfareFund: number
): CardResult {
  const player = players[playerId];
  const base = { ownership, buildings, welfareFund };

  switch (card.action) {
    case 'airTravel': {
      // 콩코드 → 타이베이(1)
      const concorOwner = ownership[15];
      let cost = 0;
      if (concorOwner !== undefined && concorOwner !== playerId) {
        cost = BOARD_TILES[15].rent[0];
      }
      const newPlayers = players.map((p) => {
        if (p.id === playerId)
          return { ...p, position: 1, money: p.money - cost + SALARY };
        if (p.id === concorOwner && concorOwner !== playerId)
          return { ...p, money: p.money + cost };
        return p;
      });
      return {
        ...base,
        players: newPlayers,
        message: `✈️ ${player.name}: 콩코드→타이베이${cost ? ` (-${cost})` : ''} +${SALARY}`,
      };
    }

    case 'cruiseTravel': {
      // 퀸엘리자베스 → 베이징(3)
      const queenOwner = ownership[28];
      let cost = 0;
      if (queenOwner !== undefined && queenOwner !== playerId) {
        cost = BOARD_TILES[28].rent[0];
      }
      const salary = player.position > 3 ? SALARY : 0;
      const newPlayers = players.map((p) => {
        if (p.id === playerId)
          return { ...p, position: 3, money: p.money - cost + salary };
        if (p.id === queenOwner && queenOwner !== playerId)
          return { ...p, money: p.money + cost };
        return p;
      });
      return {
        ...base,
        players: newPlayers,
        message: `🚢 ${player.name}: 퀸엘리자베스→베이징${cost ? ` (-${cost})` : ''}${salary ? ` +${SALARY}` : ''}`,
      };
    }

    case 'highway': {
      const newPlayers = players.map((p) =>
        p.id === playerId
          ? { ...p, position: 0, money: p.money + SALARY }
          : p
      );
      return {
        ...base,
        players: newPlayers,
        message: `🏎️ ${player.name}: 고속도로→출발 +${SALARY}`,
      };
    }

    case 'goTo': {
      const dest = card.dest!;
      const salary = dest < player.position ? SALARY : 0;
      const newPlayers = players.map((p) =>
        p.id === playerId
          ? { ...p, position: dest, money: p.money + salary }
          : p
      );
      return {
        ...base,
        players: newPlayers,
        message: `🗺️ ${player.name}→${BOARD_TILES[dest].name}${salary ? ` +${SALARY}` : ''}`,
        needsLanding: { playerId, position: dest },
      };
    }

    case 'goIsland': {
      const newPlayers = players.map((p) =>
        p.id === playerId ? { ...p, position: 10, islandTurns: 3 } : p
      );
      return {
        ...base,
        players: newPlayers,
        message: `🏝️ ${player.name}→무인도!`,
      };
    }

    case 'worldTour': {
      const newPlayers = players.map((p) =>
        p.id === playerId
          ? { ...p, position: 0, money: p.money + SALARY }
          : p
      );
      return {
        ...base,
        players: newPlayers,
        message: `🌍 ${player.name}: 세계일주 +${SALARY}`,
      };
    }

    case 'fundPayout': {
      const amount = welfareFund;
      const newPlayers = players.map((p) =>
        p.id === playerId ? { ...p, money: p.money + amount } : p
      );
      return {
        ...base,
        players: newPlayers,
        welfareFund: 0,
        message: `💰 ${player.name}: 기금 +${amount}만원`,
      };
    }

    case 'moveBack': {
      const steps = card.amount!;
      const newPos =
        (player.position + steps + BOARD_SIZE) % BOARD_SIZE;
      const newPlayers = players.map((p) =>
        p.id === playerId ? { ...p, position: newPos } : p
      );
      return {
        ...base,
        players: newPlayers,
        message: `⬅️ ${player.name}: 뒤로${Math.abs(steps)}칸→${BOARD_TILES[newPos].name}`,
        needsLanding: { playerId, position: newPos },
      };
    }

    case 'olympics': {
      let collected = 0;
      const newPlayers = players.map((p) => {
        if (p.id !== playerId && !p.bankrupt) {
          collected += 10;
          return { ...p, money: p.money - 10 };
        }
        return p;
      });
      const finalPlayers = newPlayers.map((p) =>
        p.id === playerId ? { ...p, money: p.money + collected } : p
      );
      return {
        ...base,
        players: finalPlayers,
        message: `🏟️ ${player.name}: 올림픽 +${collected}`,
      };
    }

    case 'halfSale': {
      const { tileId, value } = findMostExpensiveProperty(
        playerId,
        ownership,
        buildings
      );
      if (tileId === null) {
        return {
          ...base,
          players,
          message: `📉 ${player.name}: 반액대매출 - 부동산 없음`,
        };
      }
      const halfValue = Math.floor(value / 2);
      const newOwnership = { ...ownership };
      delete newOwnership[tileId];
      const newBuildings = { ...buildings };
      delete newBuildings[tileId];
      const newPlayers = players.map((p) =>
        p.id === playerId ? { ...p, money: p.money + halfValue } : p
      );
      return {
        players: newPlayers,
        ownership: newOwnership,
        buildings: newBuildings,
        welfareFund,
        message: `📉 ${player.name}: 반액대매출! ${BOARD_TILES[tileId].name}→+${halfValue}`,
      };
    }

    case 'buildTax': {
      const count = countBuildings(playerId, ownership, buildings);
      const tax = count * (card.amount || 0);
      if (tax === 0) {
        return {
          ...base,
          players,
          message: `${card.icon} ${player.name}: 건물 없음 - 면제`,
        };
      }
      const newPlayers = players.map((p) =>
        p.id === playerId ? { ...p, money: p.money - tax } : p
      );
      if (newPlayers[playerId].money < 0) {
        const result = processBankruptcy(playerId, newPlayers, ownership);
        return {
          ...base,
          players: result.players,
          ownership: result.ownership,
          message: `${card.icon} ${player.name}: -${tax}만원 (${count}개x${card.amount}) → 파산!`,
        };
      }
      return {
        ...base,
        players: newPlayers,
        message: `${card.icon} ${player.name}: -${tax}만원 (${count}개x${card.amount})`,
      };
    }

    case 'escapeCard': {
      const newPlayers = players.map((p) =>
        p.id === playerId ? { ...p, escapeCard: p.escapeCard + 1 } : p
      );
      return {
        ...base,
        players: newPlayers,
        message: `📻 ${player.name}: 탈출권 획득!`,
      };
    }

    case 'freePass': {
      const newPlayers = players.map((p) =>
        p.id === playerId ? { ...p, freePass: p.freePass + 1 } : p
      );
      return {
        ...base,
        players: newPlayers,
        message: `🎫 ${player.name}: 우대권 획득!`,
      };
    }

    case 'receive': {
      const newPlayers = players.map((p) =>
        p.id === playerId
          ? { ...p, money: p.money + (card.amount || 0) }
          : p
      );
      return {
        ...base,
        players: newPlayers,
        message: `${card.icon} ${player.name}: +${card.amount}만원`,
      };
    }

    case 'pay': {
      const amount = card.amount || 0;
      const newPlayers = players.map((p) =>
        p.id === playerId ? { ...p, money: p.money - amount } : p
      );
      if (newPlayers[playerId].money < 0) {
        const result = processBankruptcy(playerId, newPlayers, ownership);
        return {
          ...base,
          players: result.players,
          ownership: result.ownership,
          message: `${card.icon} ${player.name}: -${amount}만원 → 파산!`,
        };
      }
      return {
        ...base,
        players: newPlayers,
        message: `${card.icon} ${player.name}: -${amount}만원`,
      };
    }

    case 'birthday': {
      let collected = 0;
      const newPlayers = players.map((p) => {
        if (p.id !== playerId && !p.bankrupt) {
          collected += 5;
          return { ...p, money: p.money - 5 };
        }
        return p;
      });
      const finalPlayers = newPlayers.map((p) =>
        p.id === playerId ? { ...p, money: p.money + collected } : p
      );
      return {
        ...base,
        players: finalPlayers,
        message: `🎂 ${player.name}: 생일 +${collected}만원`,
      };
    }

    case 'talentShow': {
      const activeCount = players.filter(
        (p) => p.id !== playerId && !p.bankrupt
      ).length;
      const cost = activeCount * 5;
      const newPlayers = players.map((p) => {
        if (p.id === playerId) return { ...p, money: p.money - cost };
        if (!p.bankrupt) return { ...p, money: p.money + 5 };
        return p;
      });
      if (newPlayers[playerId].money < 0) {
        const result = processBankruptcy(playerId, newPlayers, ownership);
        return {
          ...base,
          players: result.players,
          ownership: result.ownership,
          message: `🎤 ${player.name}: 장기자랑 -${cost}만원 → 파산!`,
        };
      }
      return {
        ...base,
        players: newPlayers,
        message: `🎤 ${player.name}: 장기자랑 -${cost}만원`,
      };
    }

    default:
      return { ...base, players, message: '' };
  }
}
