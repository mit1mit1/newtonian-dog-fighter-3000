import { setGoalData } from "@/state/goalState";
import { setPlanetData } from "@/state/planetState";
import { setShipData } from "@/state/shipState";
import { setAsteroidData } from "@/state/shipState";
import type { NumberOfPlayers, Stage } from "@/types";

const randomBattleStages: Array<Stage> = [
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

const randomRaceStages: Array<Stage> = [
  "battlefield",
  "finalDestination",
  "pokemonStadium",
  "raceCourseOne",
  "maw",
  "kongoFalls",
];


export const setupStage = (
  stage: Stage | "random",
  numberOfPlayers: NumberOfPlayers,
  isRace?: boolean,
) => {
  if (stage === "random") {
    const random = Math.random();
    if (isRace) {
      stage = randomRaceStages[Math.floor(random * randomRaceStages.length)];
    } else {
      stage = randomBattleStages[Math.floor(random * randomBattleStages.length)];
    }
  }
  setGoalData(stage, isRace);
  setShipData(stage, numberOfPlayers);
  setPlanetData(stage);
  setAsteroidData(stage);
};
