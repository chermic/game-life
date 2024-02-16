import { Cell } from "../cell/cell";
import styles from "./row.module.css";

export const Row = ({ cells }: { cells: (0 | 1)[] }) => {
  return (
    <div className={styles.row}>
      {cells.map((isAlive, cellIndex) => (
        <Cell alive={isAlive === 1} key={cellIndex} />
      ))}
    </div>
  );
};
