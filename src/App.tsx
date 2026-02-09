import "./App.css";
import { useEffect, useState } from "react";
import { PlayersInput } from "./components/PlayersInput";
import { gameController, type GameStages } from "./controllers/GameController";
import { emitter } from "./utils/emitter";

function App() {
  const [gameStage, setGameStage] = useState<GameStages>(
    gameController.gameStage,
  );

  useEffect(() => {
    emitter.on("gameStage updated", (e: GameStages) => {
      setGameStage(e);
    });
  });

  return <>{gameStage === "getting players details" && <PlayersInput />}</>;
}

export default App;
