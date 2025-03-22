import Tile from '../Tile/Tile';
import styles from './GameBoard.module.scss';
import { TileType } from '../../types/game.ts';

const mockTiles: TileType[] = [
  {
    id: 'cat',
    uniqueId: 'cat-1',
    image: '/assets/tiles/cat.png',
  },
  {
    id: 'cat',
    uniqueId: 'cat-2',
    image: '/assets/tiles/cat.png',
  },
  {
    id: 'dog',
    uniqueId: 'dog-1',
    image: '/assets/tiles/dog.png',
  },
  {
    id: 'dog',
    uniqueId: 'dog-2',
    image: '/assets/tiles/dog.png',
  },
  {
    id: 'mouse',
    uniqueId: 'mouse-1',
    image: '/assets/tiles/mouse.png',
  },
  {
    id: 'mouse',
    uniqueId: 'mouse-2',
    image: '/assets/tiles/mouse.png',
  },
  {
    id: 'panda',
    uniqueId: 'panda-1',
    image: '/assets/tiles/panda.png',
  },
  {
    id: 'panda',
    uniqueId: 'panda-2',
    image: '/assets/tiles/panda.png',
  },
];

const GameBoard = () => {

  return (
    <div className={styles.gameBoard}>
      {mockTiles.map(tile => (
        <Tile
          key={tile.uniqueId}
          tile={tile}
          onClick={() => {}}
          isFlipped={true}
          isMatched={true}
        />
      ))}
    </div>
  );
};

export default GameBoard;
