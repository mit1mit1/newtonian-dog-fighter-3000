import { viewboxWidth, viewboxHeight } from "@/constants/mapNumbers";
import {
  middleSun,
  westBigPlanet,
  eastBigPlanet,
  planet3,
  planet4,
  planet5,
  planet6,
  westSun,
  eastSun,
  middleBlackHole,
  northBigPlanet,
  southBigPlanet,
  northWestLittlePlanet,
  northEastLittlePlanet,
  southWestLittlePlanet,
  southEastLittlePlanet,
  farWestBlackHole,
  gaseousSystem,
  baseBlackHoleMass,
  baseBlackHoleResistanceMultiplyer,
  eastOrbitingBigPlanet,
  westOrbitingBigPlanet,
} from "@/constants/stage";
import { setGoalData } from "@/state/goalState";
import { planets } from "@/state/planetState";
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
  isRace?: boolean
) => {
  if (stage === "random") {
    const random = Math.random();
    if (isRace) {
      stage = randomRaceStages[Math.floor(random * randomRaceStages.length)];
    } else {
      stage =
        randomBattleStages[Math.floor(random * randomBattleStages.length)];
    }
  }
  setGoalData(stage, isRace);
  setShipData(stage, numberOfPlayers);
  setAsteroidData(stage);
  planets.splice(0, planets.length);
  switch (stage) {
    case "battlefield":
      planets.push(middleSun);
      planets.push(westOrbitingBigPlanet);
      planets.push(eastOrbitingBigPlanet);
      planets.push(planet3);
      planets.push(planet4);
      planets.push(planet5);
      planets.push(planet6);
      break;
    case "finalDestination" || "newtonsCanons":
      planets.push(middleSun);
      break;
    case "pokemonStadium":
      planets.push(westSun);
      planets.push(eastSun);
      break;
    case "milkyWay":
      planets.push(middleBlackHole);
      planets.push(westBigPlanet);
      planets.push(eastBigPlanet);
      planets.push(northBigPlanet);
      planets.push(southBigPlanet);
      planets.push(northWestLittlePlanet);
      planets.push(northEastLittlePlanet);
      planets.push(southWestLittlePlanet);
      planets.push(southEastLittlePlanet);
      break;
    case "maw":
      planets.push(middleBlackHole);
      planets.push(westSun);
      planets.push(eastSun);
      break;
    case "kongoFalls":
      planets.push(farWestBlackHole);
      planets.push(westSun);
      planets.push(middleSun);
      planets.push(eastBigPlanet);
      planets.push(southEastLittlePlanet);
      planets.push(northEastLittlePlanet);
      break;
    case "junkyard":
      planets.push(middleSun);
      break;
    case "pinball":
      planets.push(gaseousSystem);
      break;
    case "raceCourseOne":
      planets.push(
        {
          damage: 1,
          positionX: 0.5 * viewboxWidth,
          positionY: 0.5 * viewboxHeight,
          radius: 20,
          mass: baseBlackHoleMass,
          resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
        },
        {
          damage: 1,
          positionX: 1.5 * viewboxWidth,
          positionY: 1 * viewboxHeight,
          radius: 20,
          mass: baseBlackHoleMass,
          resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
        },
        {
          damage: 1,
          positionX: 2 * viewboxWidth,
          positionY: 2 * viewboxHeight,
          radius: 20,
          mass: baseBlackHoleMass,
          resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
        },
        {
          damage: 1,
          positionX: 3 * viewboxWidth,
          positionY: 2.5 * viewboxHeight,
          radius: 20,
          mass: baseBlackHoleMass,
          resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
        },
        {
          damage: 1,
          positionX: 3.5 * viewboxWidth,
          positionY: 3 * viewboxHeight,
          radius: 20,
          mass: baseBlackHoleMass,
          resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
        }
      );
      break;
  }
};
