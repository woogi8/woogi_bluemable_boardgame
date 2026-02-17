import { GoldenKeyCard } from '@/types/game';

// ═══ 실제 부루마블 황금열쇠 30장 ═══
export const GOLDEN_KEY_CARDS: GoldenKeyCard[] = [
  // 이동 카드
  { id: 1, text: '항공여행: 콩코드 여객기를 타고 타이베이로!', action: 'airTravel', icon: '✈️', category: '이동', color: '#E3F2FD' },
  { id: 2, text: '유람선: 퀸엘리자베스호를 타고 베이징으로!', action: 'cruiseTravel', icon: '🚢', category: '이동', color: '#E3F2FD' },
  { id: 3, text: '고속도로: 출발지로 이동! (월급 수령)', action: 'highway', icon: '🏎️', category: '이동', color: '#E3F2FD' },
  { id: 4, text: '관광여행: 제주도로 이동!', action: 'goTo', dest: 5, icon: '🍊', category: '이동', color: '#E3F2FD' },
  { id: 5, text: '관광여행: 부산으로 이동!', action: 'goTo', dest: 25, icon: '🌊', category: '이동', color: '#E3F2FD' },
  { id: 6, text: '관광여행: 서울로 이동!', action: 'goTo', dest: 39, icon: '🇰🇷', category: '이동', color: '#E3F2FD' },
  { id: 7, text: '무인도로 가시오! (월급 없음)', action: 'goIsland', icon: '🏝️', category: '이동', color: '#FFEBEE' },
  { id: 8, text: '사회복지기금 수령: 기금 접수처로!', action: 'goTo', dest: 20, icon: '💰', category: '이동', color: '#FFF9C4' },
  { id: 9, text: '우주여행 초대권: 우주여행으로!', action: 'goTo', dest: 30, icon: '🛸', category: '이동', color: '#E3F2FD' },
  { id: 10, text: '사회기금 배당: 기금 전액 수령!', action: 'fundPayout', icon: '💰', category: '이동', color: '#E3F2FD' },
  { id: 11, text: '뒤로 2칸 가시오!', action: 'moveBack', amount: -2, icon: '⬅️', category: '이동', color: '#FFF3E0' },
  { id: 12, text: '뒤로 3칸 가시오!', action: 'moveBack', amount: -3, icon: '⬅️', category: '이동', color: '#FFF3E0' },
  { id: 13, text: '올림픽 개최! 각 플레이어에게 10만원씩!', action: 'olympics', icon: '🏟️', category: '이동', color: '#E8F5E9' },

  // 반액대매출
  { id: 14, text: '반액대매출! 가장 비싼 땅을 반값에 매각!', action: 'halfSale', icon: '📉', category: '반액', color: '#FFCDD2' },

  // 세금
  { id: 15, text: '정기종합소득세: 건물 1개당 5만원!', action: 'buildTax', amount: 5, icon: '📋', category: '세금', color: '#FFCDD2' },
  { id: 16, text: '건물수리비: 건물 1개당 3만원!', action: 'buildTax', amount: 3, icon: '🔧', category: '세금', color: '#FFCDD2' },
  { id: 17, text: '방범비: 건물 1개당 2만원!', action: 'buildTax', amount: 2, icon: '🔒', category: '세금', color: '#FFCDD2' },

  // 특수 (보관 가능)
  { id: 18, text: '무인도 탈출권! (보관 가능)', action: 'escapeCard', icon: '📻', category: '특수', color: '#C8E6C9' },
  { id: 19, text: '우대권: 통행료 1회 면제! (보관)', action: 'freePass', icon: '🎫', category: '특수', color: '#C8E6C9' },
  { id: 20, text: '우대권: 통행료 1회 면제! (보관)', action: 'freePass', icon: '🎫', category: '특수', color: '#C8E6C9' },

  // 상금
  { id: 21, text: '노벨평화상! +30만원', action: 'receive', amount: 30, icon: '🏆', category: '상금', color: '#E8F5E9' },
  { id: 22, text: '복권 당첨! +20만원', action: 'receive', amount: 20, icon: '🎰', category: '상금', color: '#E8F5E9' },
  { id: 23, text: '자동차경주 우승! +15만원', action: 'receive', amount: 15, icon: '🏁', category: '상금', color: '#E8F5E9' },
  { id: 24, text: '장학금! +10만원', action: 'receive', amount: 10, icon: '🎓', category: '상금', color: '#E8F5E9' },
  { id: 25, text: '연금 혜택! +10만원', action: 'receive', amount: 10, icon: '👴', category: '상금', color: '#E8F5E9' },

  // 지불
  { id: 26, text: '해외유학: -20만원', action: 'pay', amount: 20, icon: '📚', category: '지불', color: '#FFCDD2' },
  { id: 27, text: '병원비: -10만원', action: 'pay', amount: 10, icon: '🏥', category: '지불', color: '#FFCDD2' },
  { id: 28, text: '과속벌금: -10만원', action: 'pay', amount: 10, icon: '🚔', category: '지불', color: '#FFCDD2' },

  // 상금/지불 (플레이어 간)
  { id: 29, text: '생일축하! 각 플레이어에게 5만원씩 수령!', action: 'birthday', icon: '🎂', category: '상금', color: '#E8F5E9' },
  { id: 30, text: '장기자랑: 각 플레이어에게 5만원씩 지불!', action: 'talentShow', icon: '🎤', category: '지불', color: '#FFCDD2' },
];
