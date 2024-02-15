import { useState } from "react";
import { Row } from "../row/row";
import styles from "./field.module.css";
import { getGameField } from "./utils";

export const Field = ({
  columnsCount,
  rowsCount,
}: {
  columnsCount: number;
  rowsCount: number;
}) => {
  const [gameField, setGameField] = useState(
    getGameField(columnsCount, rowsCount)
  );

  const handleNextStateButtonClick = () => {
    setGameField((currentGameField) => {
      
    })
  };

  return (
    <div className={styles.field}>
      {Array.from({ length: rowsCount }, (_, column) => (
        <Row cells={Array.from({ length: columnsCount }, (_) => 0)} />
      ))}
      <button onClick={handleNextStateButtonClick}>Next state</button>
    </div>
  );
};
