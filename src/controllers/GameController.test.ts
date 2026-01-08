import { describe, it, expect, vi } from "vitest";
import { GameBoard } from "../models/GameBoard";
import { Player } from "../models/Player";

// it("can intantiate and export a single instance of GameController", () => {
//   expect(gameController).toBeInstanceOf(Object);
// });

describe("create two players with empty gameboards, human player can place ships on gameboard, first created player starts game", async () => {
  const { gameController } = await import("./GameController");
  it("can create a new human player named John and have it referenced in activePlayer property of gameBoard AND can create a second computer player named SuperDuper and have it referenced by opponentPlayer", () => {
    gameController.createPlayers([
      { name: "John", type: "human" },
      { name: "SuperDuper", type: "computer" },
    ]);
    expect(gameController.activePlayer).toBeInstanceOf(Player);
    expect(gameController.opponentPlayer).toBeInstanceOf(Player);
  });

  it("creates an initial gameboard for each player", () => {
    expect(gameController.activePlayer?.gameBoard).toBeInstanceOf(GameBoard);
    expect(gameController.opponentPlayer?.gameBoard).toBeInstanceOf(GameBoard);
  });
  it.todo("can let human player place ships on gameboard");
  vi.resetModules();
});
