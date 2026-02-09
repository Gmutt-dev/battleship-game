import mitt, { type Emitter } from "mitt";
import type { GameStages } from "../controllers/GameController";

type Events = {
  "gameStage updated": GameStages;
};

export const emitter: Emitter<Events> = mitt<Events>();
