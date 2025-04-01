import { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import Tile from '../Tile/Tile';
import styles from './GameBoard.module.scss';

const GameBoard = () => {
  const { tiles, revealedTiles, matchedIds, flipTile, checkForMatch } = useGameStore();

  useEffect(() => {
    if (revealedTiles.length === 2) {
      setTimeout(() => checkForMatch(), 600);
    }
  }, [revealedTiles]);

  return (
    <div className={styles.gameBoard}>
      {tiles.map(tile => {
        const isFlipped = revealedTiles.some(t => t.id === tile.id);
        const isMatched = matchedIds.includes(tile.pairId);

        return (
          <Tile
            key={tile.id}
            tile={tile}
            isFlipped={isFlipped || isMatched}
            isMatched={isMatched}
            onClick={() => flipTile(tile)}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;
