import { Difficulty } from '../../types/game';
import styles from './DifficultySelector.module.scss';
import { clsx } from 'clsx';

interface Props {
  selected: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

const DifficultySelector = ({ selected, onChange }: Props) => {
  return (
    <div className={styles.selector}>
      {difficulties.map(level => (
        <button
          key={level}
          onClick={() => onChange(level)}
          className={clsx(styles.button, {
            [styles.active]: selected === level,
          })}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
