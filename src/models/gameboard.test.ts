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

it("can place a ship on the player grid at top left 00 coordinates vertically", () => {
  const ship = new Ship({ length: 5 });
  const coordinateStart = "00";
  const alignment = "vertical";
  testGameboard.placeShip({ ship, coordinateStart, alignment });
  expect(testGameboard.playerGrid[0][0].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[1][0].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[2][0].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[3][0].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[4][0].containsShipSegmentOf).toBe(ship);
  expect(testGameboard.playerGrid[5][0].containsShipSegmentOf).not.toBe(ship);
  expect(testGameboard.playerGrid[6][0].containsShipSegmentOf).toBe(null);
});

it("WILL NOT place a ship, so that it will go outside of the gameboard horizontally - i.e. placement cancelled", () => {
  const ship = new Ship({ length: 5 });
  const coordinateStart = "08";
  const alignment = "horizontal";
  testGameboard.placeShip({ ship, coordinateStart, alignment });
  expect(testGameboard.playerGrid[0][8].containsShipSegmentOf).toBe(null);
  expect(testGameboard.playerGrid[0][9].containsShipSegmentOf).toBe(null);
});

it("WILL NOT place a ship, so that it will go outside of the gameboard vertically - i.e. placement cancelled", () => {
  const ship = new Ship({ length: 5 });
  const coordinateStart = "85";
  const alignment = "vertical";
  testGameboard.placeShip({ ship, coordinateStart, alignment });
  expect(testGameboard.playerGrid[8][5].containsShipSegmentOf).toBe(null);
  expect(testGameboard.playerGrid[9][5].containsShipSegmentOf).not.toBe(ship);
});

// need to (1) handle letter-number coords (2) alignment (2.1) for number of grid squares
//check that ship placement does not collide with already placed ship
//is the class of ship already placed? Only one of each class allowed
