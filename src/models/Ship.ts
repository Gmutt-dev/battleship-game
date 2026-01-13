export class Ship {
  public readonly type: string;
  public readonly segments: number;
  private hits: number = 0;

  constructor({ type, segments }: { type: string; segments: number }) {
    this.type = type;
    this.segments = segments;
  }

  public get length() {
    return this.segments;
  }

  public isSunk() {
    return this.segments === this.hits;
  }

  public hit(): Ship {
    this.hits++;

    return this;
  }
}
