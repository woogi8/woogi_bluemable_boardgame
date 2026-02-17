import { Tile } from '@/types/game';

// ═══ 실제 부루마블 원판 40칸 보드 (사진 기준 정확 배치) ═══
export const BOARD_TILES: Tile[] = [
  // ── 하단 (출발→무인도): id 0~10 ──
  { id: 0, name: '출발', type: 'start', price: 0, rent: [0], group: -1, icon: '🚀', color: '#A5D6A7' },
  { id: 1, name: '타이베이', type: 'city', price: 5, rent: [2, 10, 30, 90], group: 0, icon: '🏙️', color: '#FFCDD2', flag: '🇹🇼', buildCost: [5, 15, 25] },
  { id: 2, name: '황금열쇠', type: 'golden_key', price: 0, rent: [0], group: -1, icon: '🔑', color: '#FFF8E1' },
  { id: 3, name: '베이징', type: 'city', price: 8, rent: [4, 20, 60, 180], group: 0, icon: '🏯', color: '#FFCDD2', flag: '🇨🇳', buildCost: [5, 15, 25] },
  { id: 4, name: '마닐라', type: 'city', price: 8, rent: [4, 20, 60, 180], group: 0, icon: '🌴', color: '#FFCDD2', flag: '🇵🇭', buildCost: [5, 15, 25] },
  { id: 5, name: '제주도', type: 'city', price: 20, rent: [30], group: 9, icon: '🍊', color: '#FF8A65', flag: '🇰🇷', korean: true },
  { id: 6, name: '싱가포르', type: 'city', price: 10, rent: [5, 25, 75, 225], group: 1, icon: '🦁', color: '#FFCC80', flag: '🇸🇬', buildCost: [5, 15, 25] },
  { id: 7, name: '황금열쇠', type: 'golden_key', price: 0, rent: [0], group: -1, icon: '🔑', color: '#FFF8E1' },
  { id: 8, name: '카이로', type: 'city', price: 10, rent: [5, 25, 75, 225], group: 1, icon: '🏛️', color: '#FFCC80', flag: '🇪🇬', buildCost: [5, 15, 25] },
  { id: 9, name: '이스탄불', type: 'city', price: 12, rent: [6, 30, 90, 270], group: 1, icon: '🕌', color: '#FFCC80', flag: '🇹🇷', buildCost: [10, 30, 50] },
  { id: 10, name: '무인도', type: 'deserted_island', price: 0, rent: [0], group: -1, icon: '🏝️', color: '#81D4FA' },

  // ── 좌측 (아테네→오타와): id 11~19 ──
  { id: 11, name: '아테네', type: 'city', price: 14, rent: [7, 35, 100, 300], group: 2, icon: '🏛️', color: '#FFE082', flag: '🇬🇷', buildCost: [10, 30, 50] },
  { id: 12, name: '황금열쇠', type: 'golden_key', price: 0, rent: [0], group: -1, icon: '🔑', color: '#FFF8E1' },
  { id: 13, name: '코펜하겐', type: 'city', price: 16, rent: [8, 40, 120, 360], group: 2, icon: '🧜', color: '#FFE082', flag: '🇩🇰', buildCost: [10, 30, 50] },
  { id: 14, name: '스톡홀름', type: 'city', price: 16, rent: [8, 40, 120, 360], group: 2, icon: '❄️', color: '#FFE082', flag: '🇸🇪', buildCost: [10, 30, 50] },
  { id: 15, name: '콩코드', type: 'transport', price: 20, rent: [30], group: -1, icon: '✈️', color: '#CE93D8' },
  { id: 16, name: '베른', type: 'city', price: 18, rent: [9, 45, 130, 390], group: 3, icon: '⛰️', color: '#C8E6C9', flag: '🇨🇭', buildCost: [10, 30, 50] },
  { id: 17, name: '베를린', type: 'city', price: 18, rent: [9, 45, 130, 390], group: 3, icon: '🏙️', color: '#C8E6C9', flag: '🇩🇪', buildCost: [10, 30, 50] },
  { id: 18, name: '황금열쇠', type: 'golden_key', price: 0, rent: [0], group: -1, icon: '🔑', color: '#FFF8E1' },
  { id: 19, name: '오타와', type: 'city', price: 20, rent: [10, 50, 150, 450], group: 3, icon: '🍁', color: '#C8E6C9', flag: '🇨🇦', buildCost: [20, 60, 100] },

  // ── 코너: 사회복지기금 접수처 (20) ──
  { id: 20, name: '사회복지기금', type: 'welfare_receive', price: 0, rent: [0], group: -1, icon: '💰', color: '#FFF9C4' },

  // ── 상단 (부에노스아이레스→마드리드): id 21~29 ──
  { id: 21, name: '부에노스아이레스', type: 'city', price: 22, rent: [11, 55, 160, 480], group: 4, icon: '💃', color: '#B2DFDB', flag: '🇦🇷', buildCost: [15, 40, 75] },
  { id: 22, name: '황금열쇠', type: 'golden_key', price: 0, rent: [0], group: -1, icon: '🔑', color: '#FFF8E1' },
  { id: 23, name: '상파울루', type: 'city', price: 24, rent: [12, 60, 180, 540], group: 4, icon: '⚽', color: '#B2DFDB', flag: '🇧🇷', buildCost: [15, 45, 75] },
  { id: 24, name: '시드니', type: 'city', price: 24, rent: [12, 60, 180, 540], group: 4, icon: '🦘', color: '#B2DFDB', flag: '🇦🇺', buildCost: [15, 45, 75] },
  { id: 25, name: '부산', type: 'city', price: 25, rent: [60], group: 10, icon: '🌊', color: '#FF8A65', flag: '🇰🇷', korean: true },
  { id: 26, name: '하와이', type: 'city', price: 26, rent: [13, 65, 195, 585], group: 5, icon: '🌺', color: '#D1C4E9', flag: '🇺🇸', buildCost: [15, 45, 75] },
  { id: 27, name: '리스본', type: 'city', price: 28, rent: [14, 70, 210, 630], group: 5, icon: '⛵', color: '#D1C4E9', flag: '🇵🇹', buildCost: [15, 45, 75] },
  { id: 28, name: '퀸엘리자베스호', type: 'transport', price: 30, rent: [25], group: -1, icon: '🚢', color: '#CE93D8' },
  { id: 29, name: '마드리드', type: 'city', price: 30, rent: [15, 75, 225, 675], group: 5, icon: '🐂', color: '#D1C4E9', flag: '🇪🇸', buildCost: [15, 45, 75] },

  // ── 코너: 우주여행 (30) ──
  { id: 30, name: '우주여행', type: 'space_travel', price: 0, rent: [0], group: -1, icon: '🛸', color: '#9FA8DA' },

  // ── 우측 (도쿄→서울): id 31~39 ──
  { id: 31, name: '도쿄', type: 'city', price: 30, rent: [15, 75, 225, 675], group: 6, icon: '🗼', color: '#90CAF9', flag: '🇯🇵', buildCost: [20, 60, 100] },
  { id: 32, name: '컬럼비아호', type: 'transport', price: 45, rent: [30], group: -1, icon: '🚀', color: '#CE93D8' },
  { id: 33, name: '파리', type: 'city', price: 32, rent: [16, 80, 240, 720], group: 6, icon: '🗼', color: '#90CAF9', flag: '🇫🇷', buildCost: [20, 60, 100] },
  { id: 34, name: '로마', type: 'city', price: 32, rent: [16, 80, 240, 720], group: 6, icon: '🏟️', color: '#90CAF9', flag: '🇮🇹', buildCost: [20, 60, 100] },
  { id: 35, name: '황금열쇠', type: 'golden_key', price: 0, rent: [0], group: -1, icon: '🔑', color: '#FFF8E1' },
  { id: 36, name: '런던', type: 'city', price: 35, rent: [18, 90, 270, 810], group: 7, icon: '🎡', color: '#80DEEA', flag: '🇬🇧', buildCost: [20, 60, 100] },
  { id: 37, name: '뉴욕', type: 'city', price: 35, rent: [18, 90, 270, 810], group: 7, icon: '🗽', color: '#80DEEA', flag: '🇺🇸', buildCost: [20, 60, 100] },
  { id: 38, name: '사회복지기금', type: 'welfare_pay', price: 0, rent: [0], group: -1, icon: '💰', color: '#FFF9C4' },
  { id: 39, name: '서울', type: 'city', price: 100, rent: [200], group: 8, icon: '🏙️', color: '#EF5350', flag: '🇰🇷', korean: true },
];

// 칸 ID → 보드 위치 매핑 (11x11 그리드)
// 하단: 좌→우 (row=10), 좌측: 하→상 (col=0), 상단: 좌→우 (row=0), 우측: 상→하 (col=10)
export function getTileGridPosition(id: number): { row: number; col: number } {
  if (id <= 10) {
    // 하단: id 0(좌하)~10(우하) → row=10, col=10-id → 10-0=10, 10-10=0
    return { row: 10, col: 10 - id };
  } else if (id <= 19) {
    // 좌측: id 11~19 → col=0, row=10-(id-10)=20-id
    return { row: 20 - id, col: 0 };
  } else if (id === 20) {
    // 좌상 코너
    return { row: 0, col: 0 };
  } else if (id <= 29) {
    // 상단: id 21~29 → row=0, col=id-20
    return { row: 0, col: id - 20 };
  } else if (id === 30) {
    // 우상 코너
    return { row: 0, col: 10 };
  } else {
    // 우측: id 31~39 → col=10, row=id-30
    return { row: id - 30, col: 10 };
  }
}
