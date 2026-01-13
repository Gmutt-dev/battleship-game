import { describe, expect, it, vi } from "vitest";
import { GameBoard, type Coordinates } from "./GameBoard.ts";
import { OceanGridBlock } from "./GridBlock";
import { Ship } from "./Ship.ts";

const coordinatesA1: Coordinates = { columnLetter: "A", rowNumber: 1 };
const coordinatesJ10: Coordinates = { columnLetter: "J", rowNumber: 10 };
const coordinatesH1: Coordinates = { columnLetter: "H", rowNumber: 1 };
const coordinatesB8: Coordinates = { columnLetter: "B", rowNumber: 8 };
const coordinatesB1: Coordinates = { columnLetter: "B", rowNumber: 1 };
const coordinatesA2: Coordinates = { columnLetter: "A", rowNumber: 2 };

it("can create instance of", () => {
  expect(new GameBoard()).toBeInstanceOf(GameBoard);
});
it("has an oceangrid that contains GridBlock instances in all of it's elements", () => {
  expect(
    new GameBoard().oceanGrid
      .flat()
      .every((element) => element instanceof OceanGridBlock)
  ).toEqual(true);
});
it("has an oceangrid with a first element with coordinates of A1", () => {
  expect(new GameBoard().oceanGrid.flat()[0].coordinates).toEqual(
    coordinatesA1
  );
});
it("has an oceangrid with a last element with coordinates of J10", () => {
  const testOceanGrid = new GameBoard().oceanGrid;
  expect(
    testOceanGrid.flat()[testOceanGrid.flat().length - 1].coordinates
  ).toEqual(coordinatesJ10);
});

it("can place a ship on the player grid at top left A1 coordinates horizontally", () => {
  const testGameboard = new GameBoard();
  const testShipDetail = { type: "Battleship", segments: 4 };
  const coordinatesStart = coordinatesA1;
  const alignment = "horizontal";
  testGameboard.placeShip({
    shipDetails: testShipDetail,
    coordinatesStart,
    alignment,
  });
  expect(testGameboard.oceanGrid[0][0].containsShipSegmentOf).toBeInstanceOf(
    Ship
  );
  expect(testGameboard.oceanGrid[1][0].containsShipSegmentOf).toBeInstanceOf(
    Ship
  );
  expect(testGameboard.oceanGrid[2][0].containsShipSegmentOf).toBeInstanceOf(
    Ship
  );
  expect(testGameboard.oceanGrid[3][0].containsShipSegmentOf).toBeInstanceOf(
    Ship
  );
  expect(testGameboard.oceanGrid[4][0].containsShipSegmentOf).toBe(null);
  expect(
    testGameboard.oceanGrid[4][0].containsShipSegmentOf
  ).not.toBeInstanceOf(Ship);
  expect(testGameboard.oceanGrid[5][0].containsShipSegmentOf).toBe(null);
});

it("can place a ship on the player grid at top left A1 coordinates vertically", () => {
  const testGameboard = new GameBoard();
  const testShipDetail = { type: "Battleship", segments: 4 };
  const coordinatesStart = coordinatesA1;
  const alignment = "vertical";
  testGameboard.placeShip({
    shipDetails: testShipDetail,
    coordinatesStart,
    alignment,
  });
  expect(testGameboard.oceanGrid[0][0].containsShipSegmentOf).toBeInstanceOf(
    Ship
  );
  expect(testGameboard.oceanGrid[0][1].containsShipSegmentOf).toBeInstanceOf(
    Ship
  );
  expect(testGameboard.oceanGrid[0][2].containsShipSegmentOf).toBeInstanceOf(
    Ship
  );
  expect(testGameboard.oceanGrid[0][3].containsShipSegmentOf).toBeInstanceOf(
    Ship
  );
  expect(testGameboard.oceanGrid[0][4].containsShipSegmentOf).toBe(null);
  expect(
    testGameboard.oceanGrid[0][4].containsShipSegmentOf
  ).not.toBeInstanceOf(Ship);
  expect(testGameboard.oceanGrid[0][5].containsShipSegmentOf).toBe(null);
});

it("WILL NOT place a ship, so that it will go outside of the gameboard horizontally - i.e. placement cancelled", () => {
  const testGameboard = new GameBoard();
  const testShipDetail = { type: "Battleship", segments: 4 };
  const coordinatesStart = coordinatesH1;
  const alignment = "horizontal";
  testGameboard.placeShip({
    shipDetails: testShipDetail,
    coordinatesStart,
    alignment,
  });
  expect(testGameboard.oceanGrid[7][0].containsShipSegmentOf).toBe(null);
  expect(testGameboard.oceanGrid[8][0].containsShipSegmentOf).toBe(null);
  expect(testGameboard.oceanGrid[9][0].containsShipSegmentOf).toBe(null);
});

it("WILL NOT place a ship, so that it will go outside of the gameboard vertically - i.e. placement cancelled", () => {
  const testGameboard = new GameBoard();
  const testShipDetail = { type: "Battleship", segments: 4 };
  const coordinatesStart = coordinatesB8;
  const alignment = "vertical";
  testGameboard.placeShip({
    shipDetails: testShipDetail,
    coordinatesStart,
    alignment,
  });
  expect(testGameboard.oceanGrid[1][6].containsShipSegmentOf).toBe(null);
  expect(testGameboard.oceanGrid[1][7].containsShipSegmentOf).toBe(null);
  expect(testGameboard.oceanGrid[1][8].containsShipSegmentOf).toBe(null);
  expect(testGameboard.oceanGrid[1][9].containsShipSegmentOf).toBe(null);
});

it("won't place ship if it will collide with another already placed ship -> cancel placement and return gameboard without changes", () => {
  const testGameboard = new GameBoard();
  const testShipDetail1 = { type: "Battleship", segments: 4 };
  const coordinatesStart1 = coordinatesB1;
  const alignment1 = "vertical";
  testGameboard.placeShip({
    shipDetails: testShipDetail1,
    coordinatesStart: coordinatesStart1,
    alignment: alignment1,
  });
  const oceanGridSnapshot = structuredClone(testGameboard.oceanGrid);
  const testShipDetail2 = { type: "Cruiser", segments: 3 };
  const coordinatesStart2 = coordinatesA2;
  const alignment2 = "horizontal";
  expect(
    testGameboard.placeShip({
      shipDetails: testShipDetail2,
      coordinatesStart: coordinatesStart2,
      alignment: alignment2,
    }).oceanGrid
  ).toEqual(oceanGridSnapshot);
});

describe("Relay tests:", () => {
  // const testGameboardOfActivePlayer = new GameBoard();
  const testGameboardOfOpponentPlayer = new GameBoard();
  let attackedShip: Ship | null;
  it("can relay a received attack onward to the oceangridblock' method for handling", () => {
    const spy = vi.spyOn(testGameboardOfOpponentPlayer, "receiveAttack");
    attackedShip = testGameboardOfOpponentPlayer.receiveAttack(coordinatesA1);
    expect(spy).toReturn();
    spy.mockRestore();
  });
});
