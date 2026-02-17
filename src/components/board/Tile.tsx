'use client';

import { motion } from 'framer-motion';
import { Tile as TileType, PLAYER_COLORS, PLAYER_TOKENS } from '@/types/game';
import { useGameStore } from '@/store/gameStore';

interface TileProps {
  tile: TileType;
  cellSize: number;
}

const CORNER_IDS = [0, 10, 20, 30];
const BASE_SIZE = 54; // 기준 크기

export default function Tile({ tile, cellSize }: TileProps) {
  const players = useGameStore((s) => s.players);
  const ownership = useGameStore((s) => s.ownership);
  const buildings = useGameStore((s) => s.buildings);
  const welfareFund = useGameStore((s) => s.welfareFund);

  const owner = ownership[tile.id];
  const buildLevel = buildings[tile.id] || 0;
  const playersHere = players.filter(
    (p) => !p.bankrupt && p.position === tile.id
  );
  const isCorner = CORNER_IDS.includes(tile.id);

  // 셀 크기에 비례한 폰트 스케일
  const scale = cellSize / BASE_SIZE;
  const iconSize = isCorner ? 16 * scale : 13 * scale;
  const nameSize = isCorner ? 8 * scale : 7 * scale;
  const priceSize = 6 * scale;
  const buildSize = 7 * scale;
  const tokenSize = 13 * scale;
  const ownerBarHeight = Math.max(2, 3 * scale);
  const truncLen = cellSize >= 70 ? 6 : cellSize >= 60 ? 5 : 4;

  const buildingIcon =
    buildLevel >= 3 ? '🏨' : buildLevel === 2 ? '🏢' : buildLevel === 1 ? '🏠' : '';

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden h-full box-border"
      style={{
        background: tile.color,
        border: '1px solid #B0BEC5',
        borderRadius: isCorner ? 3 : 1,
      }}
      title={`${tile.name}${tile.price ? ` (${tile.price}만)` : ''}`}
    >
      {owner !== undefined && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: ownerBarHeight, background: PLAYER_COLORS[owner] }}
        />
      )}

      <div style={{ fontSize: iconSize, lineHeight: 1 }}>{tile.icon}</div>

      <div
        className="font-bold text-center mt-0.5 max-w-full overflow-hidden whitespace-nowrap"
        style={{ fontSize: nameSize, lineHeight: 1.1, color: '#37474F' }}
      >
        {tile.name.length > truncLen
          ? tile.name.slice(0, truncLen - 1) + '..'
          : tile.name}
      </div>

      {tile.price > 0 && (
        <div
          className="font-semibold mt-0.5"
          style={{ fontSize: priceSize, color: '#78909C' }}
        >
          {tile.price}만
        </div>
      )}

      {buildLevel > 0 && (
        <div className="absolute bottom-0 left-0.5" style={{ fontSize: buildSize }}>
          {buildingIcon}
        </div>
      )}

      {playersHere.length > 0 && (
        <div
          className="absolute bottom-0 right-0.5 flex"
          style={{ fontSize: tokenSize }}
        >
          {playersHere.map((p) => (
            <motion.span
              key={p.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              {PLAYER_TOKENS[p.id]}
            </motion.span>
          ))}
        </div>
      )}

      {tile.flag && (
        <div
          className="absolute top-0 right-0.5"
          style={{ fontSize: 6 * scale, lineHeight: 1 }}
        >
          {tile.flag}
        </div>
      )}

      {(tile.type === 'welfare_pay' || tile.type === 'welfare_receive') && welfareFund > 0 && (
        <div
          className="absolute top-0 left-0.5"
          style={{ fontSize: 7 * scale, lineHeight: 1 }}
          title={`기금: ${welfareFund}만원`}
        >
          💵
        </div>
      )}
    </div>
  );
}
