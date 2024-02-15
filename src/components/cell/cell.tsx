import cn from "classnames";
import styles from "./cell.module.css";

export const Cell = ({ alive }: { alive: boolean }) => {
  return <div className={cn(styles.cell, { [styles.alive]: alive })}></div>;
};
