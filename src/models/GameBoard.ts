import { GridBlock } from "./GridBlock";
import { type Ship } from "./Ship";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type TwoDigits = `${Digit}${Digit}`;

type ShipAlignment = "horizontal" | "vertical";

const [GRID_ROWS, GRID_COLUMNS] = [10, 10];

function extractRowAndColumnCoordinates(coordinates: TwoDigits): number[] {
  return [Number.parseInt(coordinates[0]), Number.parseInt(coordinates[1])];
}

function isPlaceable({
  ship,
  rowCoordinateStart,
  columnCoordinateStart,
  alignment,
}: {
  ship: Ship;
  rowCoordinateStart: number;
  columnCoordinateStart: number;
  alignment: ShipAlignment;
}): boolean {
  const maxPositions = alignment === "horizontal" ? GRID_COLUMNS : GRID_ROWS;
  const startPosition =
    alignment === "horizontal" ? columnCoordinateStart : rowCoordinateStart;
  const availablePositions = maxPositions - startPosition;

  return ship.length <= availablePositions;
}

export class GameBoard {
  private _playerGrid: GridBlock[][] = Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLUMNS }, () => new GridBlock())
  );

  private _opponentGrid: GridBlock[][] = Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLUMNS }, () => new GridBlock())
  );
  //   constructor({}: {}) {}

  public placeShip({
    ship,
    coordinatesStart,
    alignment = "horizontal",
  }: {
    ship: Ship;
    coordinatesStart: TwoDigits;
    alignment: ShipAlignment;
  }) {
    const [rowCoordinateStart, columnCoordinateStart] =
      extractRowAndColumnCoordinates(coordinatesStart);

    if (
      !isPlaceable({
        ship,
        rowCoordinateStart,
        columnCoordinateStart,
        alignment,
      })
    )
      return this;

    if (alignment === "horizontal") {
      for (
        let selectedColumn = columnCoordinateStart;
        selectedColumn < columnCoordinateStart + ship.length;
        selectedColumn++
      ) {
        this._playerGrid[rowCoordinateStart][
          selectedColumn
        ].containsShipSegmentOf = ship;
      }
    } else {
      for (
        let selectedRow = rowCoordinateStart;
        selectedRow < rowCoordinateStart + ship.length;
        selectedRow++
      ) {
        this._playerGrid[selectedRow][
          columnCoordinateStart
        ].containsShipSegmentOf = ship;
      }
    }

    return this;
  }
}
