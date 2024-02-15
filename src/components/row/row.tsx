import { Cell } from "../cell/cell";
import styles from "./row.module.css";

export const Row = ({ cells }: { cells: (0 | 1)[] }) => {
  return (
    <div className={styles.row}>
      {cells.map((alive) => (
        <Cell alive={alive === 1} />
      ))}
    </div>
  );
};
