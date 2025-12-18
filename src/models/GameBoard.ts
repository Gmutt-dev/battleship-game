import { GridBlock } from "./GridBlock";
import { Ship } from "./Ship";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type TwoDigits = `${Digit}${Digit}`;

type ShipAlignment = "horizontal" | "vertical";

const [GRID_ROWS, GRID_COLUMNS] = [10, 10];

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
}) {
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
    coordinateStart,
    alignment = "horizontal",
  }: {
    ship: Ship;
    coordinateStart: TwoDigits;
    alignment: ShipAlignment;
  }) {
    const rowCoordinateStart: number = Number.parseInt(coordinateStart[0]);
    const columnCoordinateStart: number = Number.parseInt(coordinateStart[1]);

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
