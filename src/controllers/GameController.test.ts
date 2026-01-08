import { it, expect } from "vitest";
import { gameController } from "./GameController";

it("can intantiate and export a single instance of GameController", () => {
  expect(gameController).toBeInstanceOf(Object);
});

it("can create a new human player named John and have it referenced in activePlayer property of gameBoard, then create a second computer player named SuperDuper and have it referenced by opponentPlayer", () => {
  gameController.createPlayer({ name: "John", type: "human" });
  expect(gameController.activePlayer).toEqual({ name: "John", type: "human" });
  gameController.createPlayer({ name: "SuperDuper", type: "computer" });
  expect(gameController.opponentPlayer).toEqual({
    name: "SuperDuper",
    type: "computer",
  });
});
