import { Row } from "../row/row";
import styles from "./field.module.css";
import { FieldState } from "../types";

type Props = {
  gameFieldState: FieldState;
  onCellClick(x: number, y: number): void;
};

export const Field = ({
  gameFieldState,
  onCellClick,
}: Props) => {
  return (
    <div className={styles.field}>
      {gameFieldState.map((row, rowIndex) => (
        <Row
          rowCellsState={row}
          key={rowIndex}
          onCellClick={(x: number) => onCellClick(x, rowIndex)}
        />
      ))}
    </div>
  );
};
