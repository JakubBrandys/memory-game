import GameBoard from '../../components/GameBoard/GameBoard.tsx';
import styles from './GamePage.module.scss'
const GamePage = () => {
  return (
    <main className={styles.gamePage}>
      <GameBoard />
    </main>
  );
};

export default GamePage;
