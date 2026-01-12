import { describe, expect, it } from "vitest";
import { TargetGridBlock, OceanGridBlock } from "./GridBlock";
import { Ship } from "./Ship";

describe("TargetGridBlock tests:", () => {
  it("can create object instance", () => {
    expect(new TargetGridBlock("A1")).toBeInstanceOf(TargetGridBlock);
  });
  it("can return string column coordinate", () => {
    expect(new TargetGridBlock("A1").columnCoordinate).toEqual("A");
  });
  it("can return string row coordinate", () => {
    expect(new TargetGridBlock("A10").rowCoordinate).toEqual("10");
  });
  it("can mark an attack on a gridblock when no ship is hit", () => {
    const testGridBlock = new TargetGridBlock("A10");
    expect(testGridBlock.isAttacked).toEqual(false);
    testGridBlock.markAttack();
    expect(testGridBlock.isAttacked).toEqual(true);
    expect(testGridBlock.containsShipSegmentOf).toEqual(null);
  });
  it("can mark an attack and keep track of a ship that was hit", () => {
    const testGridBlock = new TargetGridBlock("A10");
    const testShip = new Ship({ type: "Battleship", segments: 4 });
    testGridBlock.markAttack(testShip);
    expect(testGridBlock.isAttacked).toEqual(true);
    expect(testGridBlock.containsShipSegmentOf).toEqual(testShip);
  });
});

describe("OceanGridBlock tests:", () => {
  it("can create object instance", () => {
    expect(new OceanGridBlock("A1")).toBeInstanceOf(OceanGridBlock);
  });
  it("can return string column coordinate", () => {
    expect(new OceanGridBlock("A1").columnCoordinate).toEqual("A");
  });
  it("can return string row coordinate", () => {
    expect(new OceanGridBlock("A10").rowCoordinate).toEqual("10");
  });
  it("can receive an attack and mark itself as attacked", () => {
    const testGridBlock = new OceanGridBlock("A10");
    expect(testGridBlock.isAttacked).toEqual(false);
    testGridBlock.receiveAttack();
    expect(testGridBlock.isAttacked).toEqual(true);
  });
  it("can return null if attacked and there is no ship segment present", () => {
    const testGridBlock = new OceanGridBlock("A10");
    expect(testGridBlock.receiveAttack()).toEqual(null);
  });
  it("can return a ship reference if attacked and a ship segment is present", () => {
    const testGridBlock = new OceanGridBlock("A10");
    const testShip = new Ship({ type: "Battleship", segments: 4 });
    testGridBlock.containsShipSegmentOf = testShip;
    expect(testGridBlock.receiveAttack()).toEqual(testShip);
  });
});
