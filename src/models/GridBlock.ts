import { type Ship } from "./Ship";
import { type Coordinates } from "./GameBoard";

class GridBlock {
  public readonly coordinates: Coordinates;
  public isAttacked: boolean = false;

  constructor(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }
}

export class TargetGridBlock extends GridBlock {
  public containsShipSegmentOf: Ship | null | "unknown" = "unknown";
  constructor(coordinates: Coordinates) {
    super(coordinates);
  }
}

export class OceanGridBlock extends GridBlock {
  public containsShipSegmentOf: Ship | null = null;
  constructor(coordinates: Coordinates) {
    super(coordinates);
  }

  public receiveAttack() {
    this.isAttacked = true;
    return this.containsShipSegmentOf; // return the ship or null so that controller can notify opponent of what ship was hit (or it was a miss)
  }
}
