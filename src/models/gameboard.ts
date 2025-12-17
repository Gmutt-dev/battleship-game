import { Ship } from "./ship";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type TwoDigits = `${Digit}${Digit}`;

type ShipAlignment = "horizontal" | "vertical";

class GridBlock {
  public containsShipSegmentOf: Ship | null = null;

  constructor() {}
}

const [GRID_ROWS, GRID_COLUMNS] = [10, 10];

export class Gameboard {
  private _playerGrid: GridBlock[][] = Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLUMNS }, () => new GridBlock())
  );

  private _opponentGrid: GridBlock[][] = Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLUMNS }, () => new GridBlock())
  );
  //   constructor({}: {}) {}

  public get playerGrid() {
    return this._playerGrid;
  }

  public get opponentGrid() {
    return this._opponentGrid;
  }

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

    if (alignment === "horizontal") {
      for (
        let column = columnCoordinateStart;
        column < columnCoordinateStart + ship.length;
        column++
      ) {
        this._playerGrid[rowCoordinateStart][column].containsShipSegmentOf =
          ship;
      }
    }

    return this;
  }
}
