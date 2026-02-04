import "./App.css";
import { useState } from "react";
import { PlayersInput } from "./components/PlayersInput";

const gameStages = [
  "getting players details",
  "setup",
  "playing",
  "end",
] as const;
type GameStages = (typeof gameStages)[number];
const initialGameStage = gameStages[0];

function App() {
  const [gameStage, setGameStage] = useState<GameStages>(initialGameStage);

  function proceedToNextGameStage() {
    setGameStage(gameStages[gameStages.indexOf(gameStage) + 1]);
  }

  return (
    <>
      {gameStage === "getting players details" && (
        <PlayersInput onSubmitSuccess={proceedToNextGameStage} />
      )}
    </>
  );
}

export default App;
