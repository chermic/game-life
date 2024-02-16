import type { CellCoords, CellState, FieldState } from "./types";

export const getInitialGameFieldState = (
  columns: number,
  rows: number
): Array<(0 | 1)[]> => {
  return [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
};

const getNormalizedCellCoord = (coord: number, maxCoord: number) => {
  if (coord < 0 || coord > maxCoord) {
    return null;
  }

  return coord;
};

const getCellNeighborCoords = (
  cellCoords: CellCoords,
  { rowsCount, columnsCount }: { rowsCount: number; columnsCount: number }
): CellCoords[] => {
  const neighborsCoords: CellCoords[] = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) {
        continue;
      }

      const [cellX, cellY] = cellCoords;

      const neighborX = getNormalizedCellCoord(cellX + x, columnsCount);
      const neighborY = getNormalizedCellCoord(cellY + y, rowsCount);

      if (neighborX === null || neighborY === null) {
        continue
      }

      neighborsCoords.push([neighborX, neighborY]);
    }

  }

  return neighborsCoords;
};

const getCellAliveNeighborsCount = (fieldState: Array<Array<CellState>>, cellNeighborsCoords: CellCoords[]) => {
  return cellNeighborsCoords.reduce((aliveNeighborsCount, [x, y]) => aliveNeighborsCount + fieldState[y][x], 0);
}

const getNextCellState = (currentCellState: CellState, cellAliveNeighborsCount: number): CellState => {
  if ((currentCellState === 0 && cellAliveNeighborsCount === 3) ||
    (currentCellState === 1 && (cellAliveNeighborsCount === 2 || cellAliveNeighborsCount === 3))
  ) {
    return 1;
  }

  return 0;
}

export const getNextFieldState = (currentFieldState: FieldState): FieldState => {
  const nextFieldState = currentFieldState.map((row, rowIndex) => {
    const nextRow = row.map((cellState, columnIndex) => {
      const cellNeighborsCoords = getCellNeighborCoords([columnIndex, rowIndex], { rowsCount: currentFieldState.length, columnsCount: row.length })
      const aliveNeighborsCount = getCellAliveNeighborsCount(currentFieldState, cellNeighborsCoords)

      const nextCellState = getNextCellState(cellState, aliveNeighborsCount);

      return nextCellState;
    })

    return nextRow;
  })

  return nextFieldState;
}
