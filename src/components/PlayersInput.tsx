import "../styles/PlayersInput.css";
import { useState } from "react";
import { LabelledInput } from "./LabelledInput";
import {
  createGameController,
  type PlayerDetails,
} from "../controllers/GameController";

const defaultPlayers: {
  player1Details: PlayerDetails;
  player2Details: PlayerDetails;
} = {
  player1Details: { name: "Player1", type: "human" },
  player2Details: { name: "SupaComputa", type: "computer" },
};

export function PlayersInput({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
}) {
  const [state, setState] = useState<{
    player1Details: PlayerDetails;
    player2Details: PlayerDetails;
  }>(defaultPlayers);

  function playerNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.classList.contains("player1-input"))
      setState({
        ...state,
        player1Details: { ...state.player1Details, name: e.target.value },
      });
    else
      setState({
        ...state,
        player2Details: { ...state.player2Details, name: e.target.value },
      });
  }

  function player2TypeChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "human")
      setState({
        ...state,
        player2Details: { ...state.player2Details, type: "human" },
      });
    else
      setState({
        ...state,
        player2Details: { ...state.player2Details, type: "computer" },
      });
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createGameController(state);
    onSubmitSuccess();
  }

  return (
    <>
      <h1>Battleship!</h1>
      <main>
        <section>
          <h2>Please enter the two players' details:</h2>

          <form
            action=""
            className="player-details-form"
            onSubmit={submitHandler}
          >
            <div className="player1-details">
              <LabelledInput
                type="text"
                className="player1-input"
                value={state.player1Details.name}
                labelText="Player 1 Name:"
                onChange={playerNameChangeHandler}
                required
              />
              <p>Human player</p>
            </div>

            <div className="player2-details">
              <LabelledInput
                type="text"
                className="player2-input"
                value={state.player2Details.name}
                labelText="Player 2 Name:"
                onChange={playerNameChangeHandler}
                required
              />

              <fieldset>
                <legend>Player type?</legend>
                <LabelledInput
                  type="radio"
                  value="human"
                  name="player-type"
                  labelText="Human"
                  onChange={player2TypeChangeHandler}
                  checked={state.player2Details.type === "human"}
                />
                <LabelledInput
                  type="radio"
                  value="computer"
                  name="player-type"
                  labelText="Computer"
                  onChange={player2TypeChangeHandler}
                  checked={state.player2Details.type === "computer"}
                />
              </fieldset>
            </div>

            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </>
  );
}
