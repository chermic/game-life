import { Cell } from "../cell/cell";
import styles from "./field.module.css";

export const Field = ({
  columnsCount,
  rowsCount,
}: {
  columnsCount: number;
  rowsCount: number;
}) => {
  return (
    <div className={styles.field}>
      {Array.from({ length: columnsCount }, (_, column) =>
        Array.from({ length: rowsCount }, (_, row) => (
          <Cell key={`cell-${column}-${row}`} />
        ))
      )}
    </div>
  );
};
