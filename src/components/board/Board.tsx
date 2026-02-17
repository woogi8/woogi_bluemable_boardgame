'use client';

import Tile from './Tile';
import BoardCenter from './BoardCenter';
import { BOARD_TILES, getTileGridPosition } from '@/lib/boardData';
import { BOARD_SIZE } from '@/types/game';

const GRID_SIZE = 11;

interface BoardProps {
  cellSize: number;
}

export default function Board({ cellSize }: BoardProps) {
  const cells: React.ReactNode[] = [];

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const isPerimeter =
        row === 0 || row === GRID_SIZE - 1 || col === 0 || col === GRID_SIZE - 1;

      if (!isPerimeter) {
        if (row === 1 && col === 1) {
          cells.push(
            <div
              key="center"
              style={{
                gridRow: '2 / 11',
                gridColumn: '2 / 11',
              }}
            >
              <BoardCenter cellSize={cellSize} />
            </div>
          );
        }
        continue;
      }

      let tileId: number | null = null;

      for (let id = 0; id < BOARD_SIZE; id++) {
        const pos = getTileGridPosition(id);
        if (pos.row === row && pos.col === col) {
          tileId = id;
          break;
        }
      }

      if (tileId !== null) {
        cells.push(
          <div
            key={`tile-${tileId}`}
            style={{
              gridRow: row + 1,
              gridColumn: col + 1,
            }}
          >
            <Tile tile={BOARD_TILES[tileId]} cellSize={cellSize} />
          </div>
        );
      }
    }
  }

  return (
    <div
      className="inline-grid gap-px p-0.5"
      style={{
        gridTemplateColumns: `repeat(11, ${cellSize}px)`,
        gridTemplateRows: `repeat(11, ${cellSize}px)`,
        background: '#455A64',
        border: '3px solid #263238',
        borderRadius: 6,
        boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
      }}
    >
      {cells}
    </div>
  );
}
