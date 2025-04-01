import { TileType } from '../../types/game';
import styles from './Tile.module.scss';
import { clsx } from 'clsx';

interface TileProps {
  tile: TileType;
  onClick: (tile: TileType) => void;
  isFlipped: boolean;
  isMatched: boolean;
}

const Tile = ({ tile, onClick, isFlipped, isMatched }: TileProps) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(tile);
    }
  };

  return (
    <div
      className={clsx(styles.tile, {
        [styles.flipped]: isFlipped || isMatched,
        [styles.matched]: isMatched,
      })}
      onClick={handleClick}
      data-id={tile.id}
    >
      <div className={styles.tileInner}>
        <div className={styles.tileFront}></div>
        <div className={styles.tileBack}>
          <img src={tile.image} alt="tile" />
        </div>
      </div>
    </div>
  );
};

export default Tile;
