import { FC } from "react";
import { Cell } from "../cell/cell";
import { CellState } from "../types";
import styles from "./row.module.css";

type Props = {
  rowCellsState: CellState[];
  onCellClick(column: number): void;
};

export const Row: FC<Props> = ({ rowCellsState: cells, onCellClick }) => {
  return (
    <div className={styles.row}>
      {cells.map((isAlive, column) => (
        <Cell
          alive={isAlive === 1}
          key={column}
          onCellClick={() => onCellClick(column)}
        />
      ))}
    </div>
  );
};
