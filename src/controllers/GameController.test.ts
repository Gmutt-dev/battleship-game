import { it, expect } from "vitest";
import { Player } from "../models/Player";
import { createGameController, gameController } from "./GameController";

it("can create a new human player named John and have it referenced in activePlayer property of gameBoard AND can create a second computer player named SuperDuper and have it referenced by opponentPlayer", () => {
  createGameController({
    player1Details: { name: "John", type: "human" },
    player2Details: { name: "SuperDuper", type: "computer" },
  });
  expect(gameController!.activePlayer).toBeInstanceOf(Player);
  expect(gameController!.opponentPlayer).toBeInstanceOf(Player);
});
