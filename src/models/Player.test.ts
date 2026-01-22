import { it, expect } from "vitest";
import { Player } from "./Player";
import { GameBoard } from "./GameBoard";

it("can create a human player called John", () => {
  expect(new Player({ name: "John", type: "human" })).toBeInstanceOf(Player);
});
it("can create a computer player called SuperDuper", () => {
  expect(new Player({ name: "SuperDuper", type: "computer" })).toBeInstanceOf(
    Player
  );
});
it("creates a default gameboard with a new player created", () => {
  expect(new Player({ name: "John", type: "human" }).gameBoard).toBeInstanceOf(
    GameBoard
  );
});
