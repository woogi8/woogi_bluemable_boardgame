// ═══ 부루마블 게임 타입 정의 ═══

// 칸 타입
export type TileType =
  | 'start'
  | 'city'
  | 'transport'
  | 'golden_key'
  | 'deserted_island'
  | 'welfare_pay'
  | 'welfare_receive'
  | 'space_travel';

// 구역 (0: 없음, 1~4: 지역별, 9: 한국특수)
export type Region = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// 보드 칸 데이터
export interface Tile {
  id: number;
  name: string;
  type: TileType;
  price: number;
  rent: number[];       // [대지료, 별장1, 별장2, 빌딩, 호텔, ...조합]
  group: number;        // 색상 그룹 (-1: 특수칸)
  icon: string;
  color: string;
  flag?: string;        // 국기 이모지
  buildCost?: number[]; // [별장, 빌딩, 호텔] 건설비용 (없으면 땅값의 50%)
  korean?: boolean;     // 한국 도시 특수 표시
}

// 건물 타입
export type BuildingType = 'villa' | 'building' | 'hotel';

// 건물 상태 (한 칸의 건물 현황)
export interface BuildingState {
  villa: number;    // 0~2
  building: number; // 0~1
  hotel: number;    // 0~1
}

// 황금열쇠 카드 액션 타입
export type CardAction =
  | 'airTravel'
  | 'cruiseTravel'
  | 'highway'
  | 'goTo'
  | 'goIsland'
  | 'fundPayout'
  | 'moveBack'
  | 'olympics'
  | 'halfSale'
  | 'buildTax'
  | 'escapeCard'
  | 'freePass'
  | 'receive'
  | 'pay'
  | 'birthday'
  | 'talentShow';

// 황금열쇠 카드 카테고리
export type CardCategory = '이동' | '반액' | '세금' | '특수' | '상금' | '지불';

// 황금열쇠 카드
export interface GoldenKeyCard {
  id: number;
  text: string;
  action: CardAction;
  icon: string;
  category: CardCategory;
  color: string;
  dest?: number;    // goTo 목적지
  amount?: number;  // 금액 (이동/수령/지불)
}

// 플레이어
export interface Player {
  id: number;
  name: string;
  money: number;
  position: number;
  islandTurns: number;    // 무인도 남은 턴 (0이면 자유)
  bankrupt: boolean;
  freePass: number;       // 우대권 보유 수
  escapeCard: number;     // 무인도 탈출권 보유 수
  lapsCompleted: number;  // 완주 횟수
}

// 주사위 결과
export interface DiceResult {
  die1: number;
  die2: number;
  total: number;
  isDouble: boolean;
}

// 게임 진행 단계
export type GamePhase = 'roll' | 'moving' | 'action' | 'done';

// 게임 상태
export type GameScreen = 'lobby' | 'playing' | 'over';

// 모달 타입
export type ModalType =
  | { type: 'buy'; tileId: number }
  | { type: 'build'; tileId: number; cost: number; currentLevel: number }
  | { type: 'chance'; card: GoldenKeyCard }
  | { type: 'pass'; tileId: number; ownerId: number; rent: number }
  | { type: 'rent'; tileId: number; ownerId: number; rent: number }
  | null;

// 소유권 맵 (tileId -> playerId)
export type OwnershipMap = Record<number, number>;

// 건물 맵 (tileId -> 건물 단계 0~3)
export type BuildingMap = Record<number, number>;

// 게임 로그 엔트리
export interface LogEntry {
  message: string;
  timestamp: number;
}

// 플레이어 색상
export const PLAYER_COLORS = ['#E53935', '#1E88E5', '#43A047', '#FB8C00'] as const;
export const VEHICLE_POOL = ['✈️', '🚗', '🚲', '🏍️'] as const;
export let PLAYER_TOKENS = ['✈️', '🚗', '🚲', '🏍️'];

// 랜덤 셔플 (겹치지 않게 배정)
export function shuffleTokens() {
  const shuffled = [...VEHICLE_POOL].sort(() => Math.random() - 0.5);
  PLAYER_TOKENS = shuffled;
  return shuffled;
}

// 게임 상수
export const BOARD_SIZE = 40;
export const SALARY = 20;
export const INITIAL_MONEY = 400;
export const WELFARE_PAYMENT = 15;
export const MAX_ISLAND_TURNS = 3;
export const TRANSPORT_IDS = [15, 28, 32] as const;
