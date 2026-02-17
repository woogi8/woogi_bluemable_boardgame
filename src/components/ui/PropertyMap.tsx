'use client';

import { useGameStore } from '@/store/gameStore';
import { BOARD_TILES } from '@/lib/boardData';
import { PLAYER_COLORS, PLAYER_TOKENS } from '@/types/game';

// 구역 정의: 이름, 소속 타일 id 목록
const REGIONS: { label: string; color: string; tileIds: number[] }[] = [
  { label: '아시아', color: '#FFCDD2', tileIds: [1, 3, 4] },
  { label: '동남아/중동', color: '#FFCC80', tileIds: [6, 8, 9] },
  { label: '북유럽', color: '#FFE082', tileIds: [11, 13, 14] },
  { label: '서유럽', color: '#C8E6C9', tileIds: [16, 17, 19] },
  { label: '남미/오세아니아', color: '#B2DFDB', tileIds: [21, 23, 24] },
  { label: '태평양/이베리아', color: '#D1C4E9', tileIds: [26, 27, 29] },
  { label: '선진국', color: '#90CAF9', tileIds: [31, 33, 34] },
  { label: '영미권', color: '#80DEEA', tileIds: [36, 37] },
  { label: '한국', color: '#FF8A65', tileIds: [5, 25, 39] },
  { label: '이동수단', color: '#CE93D8', tileIds: [15, 28, 32] },
];

export default function PropertyMap() {
  const ownership = useGameStore((s) => s.ownership);
  const buildings = useGameStore((s) => s.buildings);

  return (
    <div
      className="rounded-lg overflow-y-auto"
      style={{
        background: 'rgba(255,255,255,0.93)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        padding: 6,
        maxHeight: 'calc(100vh - 80px)',
        scrollbarWidth: 'thin',
      }}
    >
      <div
        className="font-bold text-center mb-1"
        style={{ fontSize: 10, color: '#37474F' }}
      >
        🗺️ 부동산 현황
      </div>

      {REGIONS.map((region) => {
        const tiles = region.tileIds.map((id) => ({
          tile: BOARD_TILES[id],
          owner: ownership[id] as number | undefined,
          buildLevel: buildings[id] || 0,
        }));

        const ownedCount = tiles.filter((t) => t.owner !== undefined).length;

        return (
          <div key={region.label} className="mb-1.5">
            {/* 구역 헤더 */}
            <div
              className="flex items-center gap-1 rounded px-1 py-0.5"
              style={{ background: region.color, opacity: 0.9 }}
            >
              <span
                className="font-bold"
                style={{ fontSize: 8, color: '#37474F' }}
              >
                {region.label}
              </span>
              <span
                className="ml-auto font-semibold"
                style={{ fontSize: 7, color: '#546E7A' }}
              >
                {ownedCount}/{tiles.length}
              </span>
            </div>

            {/* 개별 타일 */}
            <div className="flex flex-col gap-px mt-0.5">
              {tiles.map(({ tile, owner, buildLevel }) => {
                const isOwned = owner !== undefined;
                const bldIcon =
                  buildLevel >= 3
                    ? '🏨'
                    : buildLevel === 2
                      ? '🏢'
                      : buildLevel === 1
                        ? '🏠'
                        : '';

                return (
                  <div
                    key={tile.id}
                    className="flex items-center gap-1 rounded px-1"
                    style={{
                      background: isOwned
                        ? `${PLAYER_COLORS[owner]}12`
                        : 'rgba(0,0,0,0.03)',
                      borderLeft: isOwned
                        ? `3px solid ${PLAYER_COLORS[owner]}`
                        : '3px solid transparent',
                      paddingTop: 1,
                      paddingBottom: 1,
                    }}
                  >
                    <span style={{ fontSize: 10 }}>{tile.icon}</span>
                    <span
                      className="font-semibold truncate"
                      style={{
                        fontSize: 8,
                        color: isOwned ? '#37474F' : '#9E9E9E',
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {tile.name}
                    </span>
                    <span
                      style={{
                        fontSize: 7,
                        color: '#78909C',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tile.price}만
                    </span>
                    {bldIcon && (
                      <span style={{ fontSize: 8 }}>{bldIcon}</span>
                    )}
                    {isOwned ? (
                      <span style={{ fontSize: 9 }}>
                        {PLAYER_TOKENS[owner]}
                      </span>
                    ) : (
                      <span
                        className="font-bold"
                        style={{ fontSize: 7, color: '#BDBDBD' }}
                      >
                        --
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
