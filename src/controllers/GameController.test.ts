import { it, expect } from "vitest";
import { Player } from "../models/Player";

it("can create a new human player named John and have it referenced in activePlayer property of gameBoard AND can create a second computer player named SuperDuper and have it referenced by opponentPlayer", async () => {
  const module = await import("./GameController");
  module.gameController.createPlayers({
    player1Details: { name: "John", type: "human" },
    player2Details: { name: "SuperDuper", type: "computer" },
  });
  expect(module.gameController.activePlayer).toBeInstanceOf(Player);
  expect(module.gameController.opponentPlayer).toBeInstanceOf(Player);
});
