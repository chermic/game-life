import { useState } from "react";
import { Row } from "../row/row";
import styles from "./field.module.css";
import { getInitialGameFieldState, getNextFieldState } from "./utils";

export const Field = ({
  columnsCount,
  rowsCount,
}: {
  columnsCount: number;
  rowsCount: number;
}) => {
  const [gameField, setGameField] = useState(
    getInitialGameFieldState(columnsCount, rowsCount)
  );

  const handleNextStateButtonClick = () => {
    setGameField((currentGameField) => {
      return getNextFieldState(currentGameField);
    });
  };

  return (
    <div className={styles.field}>
      {gameField.map((row, rowIndex) => (
        <Row cells={row} key={rowIndex} />
      ))}
      <button onClick={handleNextStateButtonClick}>Next state</button>
    </div>
  );
};
