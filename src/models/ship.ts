type ship = {
  length: number;
  hits: number;
  isSunk: () => boolean;
  hit: () => void;
};

export function createShip(length: number): ship {
  let hits = 0;

  const isSunk = () => hits === length;

  const hit = () => {
    hits++;
  };

  return {
    get length() {
      return length;
    },
    get hits() {
      return hits;
    },
    isSunk,
    hit,
  };
}
