import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import GameBoard from '../../components/GameBoard/GameBoard';
import { Difficulty } from '../../types/game';
import styles from './GamePage.module.scss';
import DifficultySelector from '../../components/DifficultySelector/DifficultySelector.tsx';

const GamePage = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const { loadTiles } = useGameStore();

  useEffect(() => {
    loadTiles(difficulty);
  }, [difficulty]);

  return (
    <main className={styles.gamePage}>
      <DifficultySelector selected={difficulty} onChange={setDifficulty} />
      <GameBoard />
    </main>
  );
};

export default GamePage;
