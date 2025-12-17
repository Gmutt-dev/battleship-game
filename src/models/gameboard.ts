import { Ship } from "./ship";

type ShipAlignment = "horizontal" | "vertical";

type GridBlock = {
  containsShipSegmentOf: Ship;
};

const [GRID_COLUMNS, GRID_ROWS] = [10, 10];

export class Gameboard {
  private _playerGrid: GridBlock[][] = new Array(GRID_ROWS).fill(
    new Array<GridBlock>(GRID_COLUMNS)
  );
  private _opponentGrid: GridBlock[][] = new Array(GRID_ROWS).fill(
    new Array(GRID_COLUMNS).fill("start")
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
    alignment,
  }: {
    ship: Ship;
    coordinateStart: string;
    alignment: ShipAlignment;
  }) {
    this._playerGrid[0][0] = { containsShipSegmentOf: ship };

    return this;
  }
}
