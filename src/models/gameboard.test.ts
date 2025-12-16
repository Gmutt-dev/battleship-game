import { expect, it, afterEach } from "vitest";
import { Gameboard } from "./gameboard.ts";
import { Ship } from "./ship.ts";

let testGameboard = new Gameboard();

afterEach(() => {
  testGameboard = new Gameboard();
});

it("can place a ship on the player grid at coordinates", () => {
  const ship = new Ship({ length: 5 });
  const coordinateStart = "A0";
  const alignment = "horizontal";
  testGameboard.placeShip({ ship, coordinateStart, alignment });
  // need to (1) handle letter-number coords (2) alignment (2.1) for number of grid squares
  expect(testGameboard.playerGrid[0][0].containsShipSegmentOf).toBe(ship);
});
