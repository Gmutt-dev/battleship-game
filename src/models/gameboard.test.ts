import { expect, it, afterEach } from "vitest";
import { Gameboard } from "./gameboard.ts";
import { Ship } from "./ship.ts";

let testGameboard = new Gameboard();

afterEach(() => {
  testGameboard = new Gameboard();
});

it("can place a ship on the player grid at top left 00 coordinates horizontally", () => {
  const ship = new Ship({ length: 5 });
  const coordinateStart = "00";
  const alignment = "horizontal";
  testGameboard.placeShip({ ship, coordinateStart, alignment });
  expect(testGameboard.playerGrid[0][0].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[0][1].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[0][2].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[0][3].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[0][4].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[0][5].containsShipSegmentOf).not.toBe(ship);
  expect(testGameboard.playerGrid[0][6].containsShipSegmentOf).toBe(null);
});

// need to (1) handle letter-number coords (2) alignment (2.1) for number of grid squares
//check that ship placement does not collide with already placed ship
//is the class of ship already placed? Only one of each class allowed
