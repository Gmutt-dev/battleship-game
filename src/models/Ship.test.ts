import { afterEach, expect, it } from "vitest";
import { Ship } from "./Ship.ts";

let testShip = new Ship({ type: "Carrier", segments: 5 });

afterEach(() => {
  testShip = new Ship({ type: "Carrier", segments: 5 });
});

// tests that can't be run on the public interface has been uncommented below

it("has a segments property that is returned with .segments", () => {
  expect(testShip.segments).toBe(5);
});

it("has a legth alias getter method for segments that is returned with .length", () => {
  expect(testShip.length).toBe(5);
});

it("has a type/class of ship as provided to constructor", () => {
  expect(testShip.type).toBe("Carrier");
});

it("can check if ship has not been sunk", () => {
  expect(testShip.isSunk()).toBe(false);
});
it("can check if a ship has been sunk", () => {
  for (let i = 0; i < 5; i++) testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
