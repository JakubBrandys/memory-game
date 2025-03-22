import { create } from 'zustand';
import { TileType, Difficulty } from '../types/game.ts';
import { shuffleTiles } from '../utils/shuffleTiles';
import { allTiles } from '../data/tiles';

interface GameState {
  tiles: TileType[];
  revealedTiles: TileType[];
  matchedIds: string[];
  boardLocked: boolean;
  flipTile: (tile: TileType) => void;
  checkForMatch: () => void;
  loadTiles: (difficulty: Difficulty) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  revealedTiles: [],
  matchedIds: [],
  boardLocked: false,

  loadTiles: difficulty => {
    const shuffled = shuffleTiles(allTiles, difficulty);
    set({ tiles: shuffled, revealedTiles: [], matchedIds: [] });
  },

  flipTile: tile => {
    const { revealedTiles, boardLocked } = get();
    if (boardLocked || revealedTiles.some(t => t.id === tile.id)) return;
    if (revealedTiles.length === 2) return;

    set({ revealedTiles: [...revealedTiles, tile] });
  },

  checkForMatch: () => {
    const { revealedTiles, matchedIds } = get();

    if (revealedTiles.length === 2) {
      const [first, second] = revealedTiles;
      if (first.pairId === second.pairId) {
        set({
          matchedIds: [...matchedIds, first.pairId],
          revealedTiles: [],
        });
      } else {
        setTimeout(() => {
          set({ revealedTiles: [] });
        }, 500);
      }
    }
  },
}));
