import { useCallback, useEffect, useRef, useState } from "react";
import { Field } from "../field/field";
import {
  getGliderAliveCells,
  getInitialGameFieldState,
  getNextFieldState,
} from "./utils";
import { Figure } from "./constants";

type Props = {
  columnsCount: number;
  rowsCount: number;
};

export const Game = ({ columnsCount, rowsCount }: Props) => {
  const [gameFieldState, setGameFieldState] = useState(
    getInitialGameFieldState(columnsCount, rowsCount)
  );

  const [transformTimeout, setTransformTimeout] = useState(0.5);
  const [_, setIsTimerRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof window.setInterval> | null>(
    null
  );

  const [selectedFigure, setSelectedFigure] = useState<Figure>(Figure.None);

  const getGameFieldState = useCallback(() => {
    switch (selectedFigure) {
      case Figure.None:
        setGameFieldState(getInitialGameFieldState(columnsCount, rowsCount));
        break;
      case Figure.Glider:
        setGameFieldState(getGliderAliveCells({ columnsCount, rowsCount }));
        break;
    }
  }, [columnsCount, rowsCount, selectedFigure]);

  useEffect(getGameFieldState, [getGameFieldState]);

  const handleNextStateButtonClick = () => {
    setGameFieldState((currentGameField) => {
      return getNextFieldState(currentGameField);
    });
  };

  const handleResetButtonClick = () => getGameFieldState();

  const handleCellClick = (x: number, y: number) => {
    setGameFieldState((currentGameFieldState) => {
      const nextGameFieldState = structuredClone(currentGameFieldState);
      nextGameFieldState[y][x] = currentGameFieldState[y][x] === 0 ? 1 : 0;

      return nextGameFieldState;
    });
  };

  const handleStopTransform = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTimerRunning(false);
    }
  };

  const handleStartTransform = () => {
    handleStopTransform();

    intervalRef.current = window.setInterval(() => {
      setGameFieldState((currentGameFieldState) =>
        getNextFieldState(currentGameFieldState)
      );
    }, transformTimeout * 1000);
    setIsTimerRunning(true);
  };

  return (
    <div>
      <Field gameFieldState={gameFieldState} onCellClick={handleCellClick} />
      <button onClick={handleNextStateButtonClick}>Next state</button>
      <button onClick={handleResetButtonClick}>Reset</button>
      <button
        onClick={handleStartTransform}
        disabled={intervalRef.current !== null}
      >
        Start transform
      </button>
      <button
        onClick={handleStopTransform}
        disabled={intervalRef.current === null}
      >
        Stop transform
      </button>
      <select
        onChange={(event) => setSelectedFigure(event.target.value as Figure)}
        value={selectedFigure}
      >
        {Object.values(Figure).map((figureName) => (
          <option value={figureName} key={figureName}>
            {figureName}
          </option>
        ))}
      </select>
    </div>
  );
};
