import { type Ship } from "./Ship";
import {
  type StringCoordinates,
  type ColumnLetter,
  type RowNumber,
  extractColumnAndRowCoordinates,
} from "./GameBoard";

class GridBlock {
  public coordinates: StringCoordinates;
  public isAttacked: boolean = false;
  public containsShipSegmentOf: Ship | null = null;

  constructor(coordinates: StringCoordinates) {
    this.coordinates = coordinates;
  }

  public get columnCoordinate(): ColumnLetter {
    return extractColumnAndRowCoordinates(this.coordinates)[0];
  }

  public get rowCoordinate(): RowNumber {
    return extractColumnAndRowCoordinates(this.coordinates)[1];
  }
}

export class TargetGridBlock extends GridBlock {
  constructor(coordinates: StringCoordinates) {
    super(coordinates);
  }
  public markAttack(ship: Ship | null = null) {
    this.isAttacked = true;
    this.containsShipSegmentOf = ship;
  }
}

export class OceanGridBlock extends GridBlock {
  constructor(coordinates: StringCoordinates) {
    super(coordinates);
  }

  public receiveAttack() {
    this.isAttacked = true;
    return this.containsShipSegmentOf; // return the ship or null so that controller can notify opponent of what ship was hit (or it was a miss)
  }
}
