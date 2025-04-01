import { TileType, Difficulty } from '../types/game';

const difficultyPairMap: Record<Difficulty, number> = {
  easy: 4,
  medium: 6,
  hard: 8,
};

export function shuffleTiles(
  tiles: { id: string; image: string }[],
  difficulty: Difficulty
): TileType[] {
  const pairCount = difficultyPairMap[difficulty];
  const selected = tiles.slice(0, pairCount);

  const pairedTiles: TileType[] = selected.flatMap(tile => [
    {
      id: `${tile.id}-1`,
      pairId: tile.id,
      image: tile.image,
    },
    {
      id: `${tile.id}-2`,
      pairId: tile.id,
      image: tile.image,
    },
  ]);

  for (let i = pairedTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairedTiles[i], pairedTiles[j]] = [pairedTiles[j], pairedTiles[i]];
  }

  return pairedTiles;
}
