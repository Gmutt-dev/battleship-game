import { GameBoard } from "./GameBoard";

export class Player {
  public name: string;
  public type: "human" | "computer";
  public gameBoard: GameBoard;

  constructor({ name, type }: { name: string; type: "human" | "computer" }) {
    this.name = name;
    this.type = type;
    this.gameBoard = new GameBoard();
  }
}
