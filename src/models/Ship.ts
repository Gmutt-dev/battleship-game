export class Ship {
  private _length: number;
  private _hits: number = 0;

  constructor({ length }: { length: number }) {
    this._length = length;
  }

  public get length() {
    return this._length;
  }

  public isSunk() {
    return this._length === this._hits;
  }

  public hit() {
    this._hits++;

    return this;
  }
}
