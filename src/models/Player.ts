import { GameBoard } from "./GameBoard";

export type PlayerType = "human" | "computer";

export class Player {
  public name: string;
  public readonly type: PlayerType;
  public readonly gameBoard: GameBoard;
  public readonly playableShipsDetails: ReadonlyArray<{
    type: string;
    segments: number;
  }> = [
    { type: "Carrier", segments: 5 },
    { type: "Battleship", segments: 4 },
    { type: "Cruiser", segments: 3 },
    { type: "Submarine", segments: 3 },
    { type: "Destroyer", segments: 2 },
  ];

  constructor({ name, type }: { name: string; type: "human" | "computer" }) {
    this.name = name;
    this.type = type;
    this.gameBoard = new GameBoard();
  }
}
