import { afterEach, expect, it } from "vitest";
import { Ship } from "./Ship.ts";

let testShip = new Ship({ length: 5 });

afterEach(() => {
  testShip = new Ship({ length: 5 });
});

it("has a length property that is returned with getLength() method", () => {
  expect(testShip.length).toBe(5);
});
it("has a hits property that is returned with the getHits() method - should be 0 for a newly created ship", () => {
  expect(testShip.hits).toBe(0);
});
it("can check if ship has not been sunk", () => {
  expect(testShip.isSunk()).toBe(false);
});
it("can check if a ship has been sunk", () => {
  for (let i = 0; i < 5; i++) testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
it("can take hits and increase the hit counter by 1", () => {
  expect(testShip.hits).toBe(0);
  testShip.hit();
  expect(testShip.hits).toBe(1);
});
