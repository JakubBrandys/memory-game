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
  attempts: number;
  time: number;
  timerIntervalId: number | null;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  revealedTiles: [],
  matchedIds: [],
  boardLocked: false,
  attempts: 0,
  time: 0,
  timerIntervalId: null,

  startTimer: () => {
    if (get().timerIntervalId !== null) return;

    const id = window.setInterval(() => {
      set(state => ({ time: state.time + 1 }));
    }, 1000);

    set({ timerIntervalId: id });
  },

  stopTimer: () => {
    const { timerIntervalId } = get();
    if (timerIntervalId !== null) {
      clearInterval(timerIntervalId);
      set({ timerIntervalId: null });
    }
  },

  resetTimer: () => {
    const { stopTimer } = get();
    stopTimer();
    set({ time: 0 });
  },

  loadTiles: difficulty => {
    const shuffled = shuffleTiles(allTiles, difficulty);
    set({
      tiles: shuffled,
      revealedTiles: [],
      matchedIds: [],
      attempts: 0,
      time: 0,
    });

    get().resetTimer();
    get().startTimer();
  },

  flipTile: tile => {
    const { revealedTiles, boardLocked } = get();
    if (boardLocked || revealedTiles.some(t => t.id === tile.id)) return;
    if (revealedTiles.length === 2) return;

    set({ revealedTiles: [...revealedTiles, tile] });
  },

  checkForMatch: () => {
    const { revealedTiles, matchedIds, attempts, tiles, stopTimer } = get();

    if (revealedTiles.length === 2) {
      const [first, second] = revealedTiles;
      const isMatch = first.pairId === second.pairId;
      const updatedMatched = isMatch ? [...matchedIds, first.pairId] : matchedIds;

      set({
        attempts: attempts + 1,
        matchedIds: updatedMatched,
        revealedTiles: [],
      });

      const totalPairs = tiles.length / 2;
      if (updatedMatched.length === totalPairs) {
        stopTimer();
      }
    }
  },
}));
