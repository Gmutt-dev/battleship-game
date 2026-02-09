import { Player, type PlayerType } from "../models/Player";
import { emitter } from "../utils/emitter";

export type PlayerDetails = {
  name: string;
  type: PlayerType;
};

const gameStages = [
  "getting players details",
  "setup",
  "playing",
  "end",
] as const;
export type GameStages = (typeof gameStages)[number];
const initialGameStage = gameStages[0];

class GameController {
  public gameStage: GameStages;
  public activePlayer?: Player;
  public opponentPlayer?: Player;

  constructor() {
    this.gameStage = initialGameStage;
    emitter.emit("gameStage updated", "getting players details");
  }

  //   public reset() {
  //     this.gameStage = "setup";
  //   }

  private proceedToNextGameStage() {
    this.gameStage = gameStages[gameStages.indexOf(this.gameStage) + 1];
    emitter.emit("gameStage updated", this.gameStage);
  }

  public createPlayers({
    player1Details,
    player2Details,
  }: {
    player1Details: PlayerDetails;
    player2Details: PlayerDetails;
  }): void {
    if (player1Details === undefined || player2Details === undefined)
      throw new Error(
        "Must provide player details for both players to continue",
      );
    this.activePlayer = new Player(player1Details);
    this.opponentPlayer = new Player(player2Details);
    this.activePlayer.gameBoard.linkOpponentPublicGrid({
      opponentGetPublicGridFunction:
        this.opponentPlayer.gameBoard.getPublicGrid,
    });
    this.opponentPlayer.gameBoard.linkOpponentPublicGrid({
      opponentGetPublicGridFunction: this.activePlayer.gameBoard.getPublicGrid,
    });
    this.proceedToNextGameStage();
  }

  //   public startRound({
  //     playerOneDetails,
  //     PlayerTwoDetails,
  //   }: {
  //     playerOneDetails: { name: string; type: "human" | "computer" };
  //     playerTwoDetails: { name: string; type: "human" | "computer" };
  //   }) {
  //     this.gameStage = "playing";
  //   }
}

//setup with two gameboards // creating and placing of ships (auto place if opponent is computer)-> playing turn by turn -> winner
//keep track of active player's turn and send attacks to opposing player's gameboard (.receiveattack) and send the return ship value (even if null as miss) to the curren player's gameboard targetgrid (markAttack), announce name of ship that was hit (with length), check for win and end game if winner

export const gameController: GameController = new GameController();
