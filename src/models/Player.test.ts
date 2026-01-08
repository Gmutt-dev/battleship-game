import { it, expect } from "vitest";
import { Player } from "./Player";

it("can create a human player called John", () => {
  expect(new Player({ name: "John", type: "human" })).toEqual({
    name: "John",
    type: "human",
  });
});
it("can create a computer player called SuperDuper", () => {
  expect(new Player({ name: "SuperDuper", type: "computer" })).toEqual({
    name: "SuperDuper",
    type: "computer",
  });
});
