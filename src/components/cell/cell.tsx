import cn from "classnames";
import styles from "./cell.module.css";

type Props = {
  alive: boolean;
  onCellClick(): void;
};

export const Cell = ({ alive, onCellClick }: Props) => {
  return <div className={cn(styles.cell, { [styles.alive]: alive })} onClick={onCellClick}></div>;
};
