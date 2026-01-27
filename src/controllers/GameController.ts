import { Player, type PlayerType } from "../models/Player";

type PlayerDetails = {
  name: string;
  type: PlayerType;
};

export class GameController {
  private gameStage: "setup" | "playing" | "end";
  public activePlayer!: Player;
  public opponentPlayer!: Player;

  constructor({
    player1Details,
    player2Details,
  }: {
    player1Details: PlayerDetails;
    player2Details: PlayerDetails;
  }) {
    this.gameStage = "setup";
    this.createPlayers({ player1Details, player2Details });
  }

  //   public reset() {
  //     this.gameStage = "setup";
  //   }

  private createPlayers({
    player1Details,
    player2Details,
  }: {
    player1Details: PlayerDetails;
    player2Details: PlayerDetails;
  }): void {
    if (player1Details === undefined || player2Details === undefined)
      throw new Error(
        "Must provide player details for both players to continue"
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
