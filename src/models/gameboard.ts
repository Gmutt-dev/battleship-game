import type { ship } from "./ship";

type shipAlignment = "horizontal" | "vertical";

type gameboard = {
  playerGrid: gridBlock[][];
  opponentGrid: gridBlock[][];
  placeShip: ({
    ship,
    coordinateStart,
    alignment,
  }: {
    ship: ship;
    coordinateStart: string;
    alignment: shipAlignment;
  }) => gameboard;
};

type gridBlock = {
  containsShipSegmentOf: ship;
};

const [GRID_WIDTH, GRID_HEIGHT] = [10, 10];

export class Gameboard implements gameboard {
  private _playerGrid: gridBlock[][] = new Array(GRID_WIDTH).fill(
    new Array<gridBlock>(GRID_HEIGHT)
  );
  private _opponentGrid: gridBlock[][] = new Array(GRID_WIDTH).fill(
    new Array<gridBlock>(GRID_HEIGHT)
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
    ship: ship;
    coordinateStart: string;
    alignment: shipAlignment;
  }) {
    this._playerGrid[0][0] = { containsShipSegmentOf: ship };

    return this;
  }
}
