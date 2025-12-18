import { expect, it } from "vitest";
import { GridBlock } from "./GridBlock";

it("can create object instance", () => {
  expect(new GridBlock()).toBeInstanceOf(GridBlock);
});
