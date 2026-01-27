import "./App.css";
import { useState } from "react";
import { PlayersInput } from "./components/PlayersInput";

type GameStages = "getting players details" | "setup" | "playing" | "end";

function App() {
  const [gameStage, setGameStage] = useState<GameStages>(
    "getting players details"
  );

  function proceedToSetupStage() {
    setGameStage("setup");
  }

  return (
    <>
      {gameStage === "getting players details" && (
        <PlayersInput onSubmitSuccess={proceedToSetupStage} />
      )}
    </>
  );
}

export default App;
