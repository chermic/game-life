import type { CellCoords, CellState, FieldState } from "../types";
import { FIGURE_ALIVE_CELLS_RELATIVE_COORDS, Figure } from "./constants";

export const getInitialGameFieldState = (
  columns: number,
  rows: number
): Array<(0 | 1)[]> => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => 0)
  );
};

const getGameFieldWithAliveCells = ({
  aliveCellsCoords,
  rowsCount,
  columnsCount,
}: {
  aliveCellsCoords: CellCoords[];
  rowsCount: number;
  columnsCount: number;
}) => {
  const blankGameField = getInitialGameFieldState(columnsCount, rowsCount);

  aliveCellsCoords.forEach(([x, y]) => {
    blankGameField[y][x] = 1;
  });

  return blankGameField;
};

const getFigureStartCoords = ({
  figureHeight,
  figureWidth,
  columnsCount,
  rowsCount,
}: {
  figureHeight: number;
  figureWidth: number;
  rowsCount: number;
  columnsCount: number;
}): CellCoords => {
  const horizontalFieldCenter = Math.floor(rowsCount / 2);
  const horizontalFigureStart =
    horizontalFieldCenter - Math.floor(figureWidth / 2);

  const verticalFieldCenter = Math.floor(columnsCount / 2);
  const verticalFigureStart =
    verticalFieldCenter - Math.floor(figureHeight / 2);

  return [horizontalFigureStart, verticalFigureStart];
};

const getAbsoluteCellCoords = (
  shiftedCoords: CellCoords,
  figureStartCoords: CellCoords
): CellCoords => {
  return [
    shiftedCoords[0] + figureStartCoords[0],
    shiftedCoords[1] + figureStartCoords[1],
  ];
};

export const getGliderAliveCells = ({
  rowsCount,
  columnsCount,
}: {
  rowsCount: number;
  columnsCount: number;
}) => {
  const {
    coords,
    height: INITIAL_FIGURE_HEIGHT,
    width: INITIAL_FIGURE_WIDTH,
  } = FIGURE_ALIVE_CELLS_RELATIVE_COORDS[Figure.Glider];

  const figureStartCoords = getFigureStartCoords({
    columnsCount,
    rowsCount,
    figureHeight: INITIAL_FIGURE_HEIGHT,
    figureWidth: INITIAL_FIGURE_WIDTH,
  });

  const absoluteAliveCellsCoords: CellCoords[] = coords.map(
    (shiftedAliveCellCoords) =>
      getAbsoluteCellCoords(shiftedAliveCellCoords, figureStartCoords)
  );

  return getGameFieldWithAliveCells({
    aliveCellsCoords: absoluteAliveCellsCoords,
    columnsCount,
    rowsCount,
  });
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
        continue;
      }

      neighborsCoords.push([neighborX, neighborY]);
    }
  }

  return neighborsCoords;
};

const getCellAliveNeighborsCount = (
  fieldState: Array<Array<CellState>>,
  cellNeighborsCoords: CellCoords[]
) => {
  return cellNeighborsCoords.reduce((aliveNeighborsCount, [x, y]) => {
    return aliveNeighborsCount + fieldState[y][x];
  }, 0);
};

const getNextCellState = (
  currentCellState: CellState,
  cellAliveNeighborsCount: number
): CellState => {
  if (
    (currentCellState === 0 && cellAliveNeighborsCount === 3) ||
    (currentCellState === 1 &&
      (cellAliveNeighborsCount === 2 || cellAliveNeighborsCount === 3))
  ) {
    return 1;
  }

  return 0;
};

export const getNextFieldState = (
  currentFieldState: FieldState
): FieldState => {
  const nextFieldState = currentFieldState.map((row, rowIndex) => {
    const nextRow = row.map((cellState, columnIndex) => {
      const cellNeighborsCoords = getCellNeighborCoords(
        [columnIndex, rowIndex],
        {
          rowsCount: currentFieldState.length - 1,
          columnsCount: row.length - 1,
        }
      );
      const aliveNeighborsCount = getCellAliveNeighborsCount(
        currentFieldState,
        cellNeighborsCoords
      );

      const nextCellState = getNextCellState(cellState, aliveNeighborsCount);

      return nextCellState;
    });

    return nextRow;
  });

  return nextFieldState;
};
