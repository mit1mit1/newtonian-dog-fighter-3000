import { setPlanetData } from "@/state/planetState";
import { setShipData } from "@/state/shipState";
import { setAsteroidData } from "@/state/asteroidState";
import type { NumberOfPlayers, Stage } from "@/types";

const randomStages: Array<Stage> = [
  "battlefield",
  "finalDestination",
  "pokemonStadium",
  "milkyWay",
  "maw",
  "kongoFalls",
  "freefall",
  "junkyard",
  "pinball",
];

export const setupStage = (
  stage: Stage | "random",
  numberOfPlayers: NumberOfPlayers
) => {
  if (stage === "random") {
    const random = Math.random();
    stage = randomStages[Math.floor(random * randomStages.length)];
  }
  setShipData(stage, numberOfPlayers);
  setPlanetData(stage);
  setAsteroidData(stage);
};
