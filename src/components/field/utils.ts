import { CellCoords } from "./types";

export const getGameField = (
  columns: number,
  rows: number
): Array<(0 | 1)[]> => {
  return [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
};

export const getNormalizedCellCoord = (coord: number, maxCoord: number) => {
  if (coord < 0 || coord > maxCoord) {
    return null;
  }

  return coord;
};

export const getCellNeighborCoords = (
  cellCoords: CellCoords,
  { rowsCount, columnsCount }: { rowsCount: number; columnsCount: number }
): CellCoords[] => {
  const MAX_CELL_NEIGHBORS = 8;

  for (let i = 0; i < MAX_CELL_NEIGHBORS; i++) {
    const xCoord = cellCoords[0]
  }
};
