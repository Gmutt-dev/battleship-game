export class Ship {
  private _type: string;
  private _length: number;
  private _hits: number = 0;

  constructor({ type, length }: { type: string; length: number }) {
    this._length = length;
    this._type = type;
  }

  public get type() {
    return this._type;
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
