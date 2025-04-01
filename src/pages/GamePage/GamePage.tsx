import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import GameBoard from '../../components/GameBoard/GameBoard';
import { Difficulty } from '../../types/game';
import styles from './GamePage.module.scss';
import DifficultySelector from '../../components/DifficultySelector/DifficultySelector.tsx';
import { formatTime } from '../../utils/formatTime.ts';

const GamePage = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const { loadTiles, attempts, time } = useGameStore();

  useEffect(() => {
    loadTiles(difficulty);
  }, [difficulty]);

  return (
    <main className={styles.gamePage}>
      <DifficultySelector selected={difficulty} onChange={setDifficulty} />
      <p>{`Time: ${formatTime(time)}s`}</p>
      <p>Attempts: {attempts}</p>
      <GameBoard />
    </main>
  );
};

export default GamePage;
