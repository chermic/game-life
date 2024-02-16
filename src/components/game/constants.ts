import { CellCoords } from "../types";

export enum Figure {
  None = "none",
  Glider = "glider",
}

export const FIGURE_ALIVE_CELLS_RELATIVE_COORDS: Record<
  Figure,
  { coords: CellCoords[]; height: number; width: number }
> = {
  [Figure.None]: { coords: [], height: 0, width: 0 },
  [Figure.Glider]: {
    coords: [
      [1, 0],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    width: 3,
    height: 3,
  },
};
