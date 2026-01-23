import { it, expect } from "vitest";
import { Player } from "../models/Player";
import { GameController } from "./GameController";

// it("can intantiate and export a single instance of GameController", () => {
//   expect(gameController).toBeInstanceOf(Object);
// });

it("can create a new human player named John and have it referenced in activePlayer property of gameBoard AND can create a second computer player named SuperDuper and have it referenced by opponentPlayer", () => {
  const gameController = new GameController({
    player1Details: { name: "John", type: "human" },
    player2Details: { name: "SuperDuper", type: "computer" },
  });
  expect(gameController.activePlayer).toBeInstanceOf(Player);
  expect(gameController.opponentPlayer).toBeInstanceOf(Player);
});
