import { Player, type PlayerType } from "../models/Player";

class GameController {
  private gameStage: "setup" | "playing" | "end";
  public activePlayer?: Player;
  public opponentPlayer?: Player;

  constructor() {
    this.gameStage = "setup";
  }

  //   public reset() {
  //     this.gameStage = "setup";
  //   }

  public createPlayers(
    playersDetails: {
      name: string;
      type: PlayerType;
    }[]
  ) {
    [this.activePlayer, this.opponentPlayer] = playersDetails.map(
      (playerDetails) => new Player(playerDetails)
    );
    this.activePlayer.gameBoard.linkOpponentGameBoard({
      opponentGameBoard: this.opponentPlayer.gameBoard,
    });
    this.opponentPlayer.gameBoard.linkOpponentGameBoard({
      opponentGameBoard: this.activePlayer.gameBoard,
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

export const gameController = new GameController();
