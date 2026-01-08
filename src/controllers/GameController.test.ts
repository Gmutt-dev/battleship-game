import { describe, it, expect } from "vitest";
import { gameController } from "./GameController";
import { GameBoard } from "../models/GameBoard";
import { Player } from "../models/Player";

it("can intantiate and export a single instance of GameController", () => {
  expect(gameController).toBeInstanceOf(Object);
});

describe("create two players with gameboards, first created player starts", () => {
  it("can create a new human player named John and have it referenced in activePlayer property of gameBoard", () => {
    gameController.createPlayer({ name: "John", type: "human" });
    expect(gameController.activePlayer).toBeInstanceOf(Player);
  });
  it(", then create a second computer player named SuperDuper and have it referenced by opponentPlayer.  ", () => {
    gameController.createPlayer({ name: "SuperDuper", type: "computer" });
    expect(gameController.opponentPlayer).toBeInstanceOf(Player);
  });
  it("creates an initial gameboard for each player", () => {
    expect(gameController.activePlayer?.gameBoard).toBeInstanceOf(GameBoard);
    expect(gameController.opponentPlayer?.gameBoard).toBeInstanceOf(GameBoard);
  });
});
