import { TargetGridBlock, OceanGridBlock } from "./GridBlock";
import { Ship } from "./Ship";

export type ColumnLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J";
export type RowNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Coordinates = { columnLetter: ColumnLetter; rowNumber: RowNumber };

type ShipAlignment = "horizontal" | "vertical";

const [GRID_COLUMNS, GRID_ROWS] = [10, 10];
const COLUMN_LETTERS = "ABCDEFGHIJ";

export class GameBoard {
  public readonly oceanGrid: ReadonlyArray<ReadonlyArray<OceanGridBlock>>;
  private getOpponentPublicGrid?: () => ReadonlyArray<
    ReadonlyArray<TargetGridBlock>
  >;

  constructor() {
    this.oceanGrid = Array.from({ length: GRID_COLUMNS }, (v, columnIndex) =>
      Array.from({ length: GRID_ROWS }, (v, rowIndex) => {
        const coordinatesFromArrayIndexes: Coordinates = {
          columnLetter: COLUMN_LETTERS[columnIndex] as ColumnLetter,
          rowNumber: (rowIndex + 1) as RowNumber,
        };
        return new OceanGridBlock(coordinatesFromArrayIndexes);
      })
    );
  }

  public linkOpponentPublicGrid({
    opponentGetPublicGridFunction,
  }: {
    opponentGetPublicGridFunction: () => ReadonlyArray<
      ReadonlyArray<TargetGridBlock>
    >;
  }) {
    this.getOpponentPublicGrid = opponentGetPublicGridFunction;
  }

  public get targetGrid(): ReadonlyArray<ReadonlyArray<TargetGridBlock>> {
    if (!this.getOpponentPublicGrid)
      throw new Error(
        "Opponent grid not set with .linkOpponentBoard(), so cannot return opponent's public grid"
      );

    return this.getOpponentPublicGrid();
  }

  public getPublicGrid = (): ReadonlyArray<ReadonlyArray<TargetGridBlock>> => {
    return this.oceanGrid.map((column) =>
      column.map((oceanGridBlock) => {
        const { receiveAttack, ...gridBlockWithoutOceanProperties } =
          oceanGridBlock;
        return gridBlockWithoutOceanProperties.isAttacked
          ? Object.assign(
              new TargetGridBlock(gridBlockWithoutOceanProperties.coordinates),
              gridBlockWithoutOceanProperties
            )
          : Object.assign(
              new TargetGridBlock(gridBlockWithoutOceanProperties.coordinates),
              gridBlockWithoutOceanProperties,
              { containsShipSegmentOf: "unknown" }
            );
      })
    );
  };

  public placeShip({
    shipDetails,
    coordinatesStart,
    alignment = "horizontal",
  }: {
    shipDetails: { type: string; segments: number };
    coordinatesStart: Coordinates;
    alignment: ShipAlignment;
  }): GameBoard {
    const startingGridBlock = this.oceanGrid
      .flat()
      .find(
        (gridBlock) =>
          gridBlock.coordinates.columnLetter ===
            coordinatesStart.columnLetter &&
          gridBlock.coordinates.rowNumber === coordinatesStart.rowNumber
      );
    if (startingGridBlock === undefined) return this;
    let placementGridBlocks;
    if (alignment === "vertical") {
      const placementColumn = this.oceanGrid.find((column) =>
        column.some((gridBlock) => gridBlock === startingGridBlock)
      );
      if (placementColumn === undefined) return this;
      placementGridBlocks = placementColumn.slice(
        placementColumn.indexOf(startingGridBlock),
        placementColumn.indexOf(startingGridBlock) + shipDetails.segments
      );
    } else {
      // alignment === "horizontal"
      const placementRow = this.oceanGrid
        .flat()
        .filter(
          (gridBlock) =>
            gridBlock.coordinates.rowNumber === coordinatesStart.rowNumber
        );
      placementGridBlocks = placementRow.slice(
        placementRow.indexOf(startingGridBlock),
        placementRow.indexOf(startingGridBlock) + shipDetails.segments
      );
    }

    if (placementGridBlocks.length < shipDetails.segments) return this; // placed ship shouldn't go outside gameboard
    if (
      placementGridBlocks?.some(
        (gridBlock) => gridBlock.containsShipSegmentOf !== null
      )
    )
      return this; // placed ship should not collide with already placed ship
    //sucessfully place ship refs:
    const shipToPlace = new Ship(shipDetails);
    placementGridBlocks.forEach(
      (gridBlock) => (gridBlock.containsShipSegmentOf = shipToPlace)
    );
    return this;
  }

  public receiveAttack(coordinates: Coordinates): Ship | null {
    return this.oceanGrid
      .flat()
      .find(
        (gridBlock) =>
          gridBlock.coordinates.columnLetter === coordinates.columnLetter &&
          gridBlock.coordinates.rowNumber === coordinates.rowNumber
      )!
      .receiveAttack();
  }
}
