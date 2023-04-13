import { viewboxWidth, viewboxHeight } from "@/constants/mapNumbers";
import { baseShipMass } from "@/constants/ships";
import {
  middleSun,
  westBigPlanet,
  eastBigPlanet,
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
  baseSunRadius,
  earth,
  jupiter,
  mars,
  mercury,
  pluto,
  saturn,
  sol,
  uranus,
  venus,
  getOrbitingPlanet,
} from "@/constants/stage";
import { planets } from "@/state/planetState";
import { setShipData, shipState } from "@/state/shipState";
import { spaceState } from "@/state/spaceState";
import type { Stage } from "@/types";
import { setTargets } from "./setTargets";

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
  "sol",
  "blender",
];

export const setupStage = (stage: Stage | "random", isRace?: boolean) => {
  if (stage === "random") {
    const random = Math.random();
    if (isRace) {
      stage = randomRaceStages[Math.floor(random * randomRaceStages.length)];
    } else {
      stage =
        randomBattleStages[Math.floor(random * randomBattleStages.length)];
    }
  }
  setShipData(stage);
  setTargets(stage, isRace);
  planets.splice(0, planets.length);
  shipState.asteroids.splice(0, shipState.asteroids.length);
  spaceState.setZoom(-1);
  switch (stage) {
    case "battlefield":
      planets.push(middleSun);
      planets.push(westOrbitingBigPlanet);
      planets.push(eastOrbitingBigPlanet);
      break;
    case "finalDestination":
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

      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2,
        positionY: viewboxHeight / 2 + 200,
        speedX: 0.15,
        speedY: 0,
        radius: 6,
      });
      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2,
        positionY: viewboxHeight / 2 - 200,
        speedX: -0.15,
        speedY: 0,
        radius: 6,
      });
      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2 + 300,
        positionY: viewboxHeight / 2,
        speedX: 0,
        speedY: -0.3,
        radius: 6,
      });
      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2 - 300,
        positionY: viewboxHeight / 2,
        speedX: 0,
        speedY: 0.3,
        radius: 6,
      });
      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2,
        positionY: viewboxHeight / 2 + 300,
        speedX: 0.3,
        speedY: 0,
        radius: 6,
      });
      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2,
        positionY: viewboxHeight / 2 - 300,
        speedX: -0.3,
        speedY: 0,
        radius: 6,
      });
      break;
    case "pinball":
      planets.push(gaseousSystem);
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
          shipState.asteroids.push({
            mass: baseShipMass,
            positionX: viewboxWidth / 2 - 450 + 225 * i,
            positionY: viewboxHeight / 2 - 225 + 225 * j,
            speedX: 0,
            speedY: 0,
            radius: 6,
          });
        }
      }
      break;
    case "newtonsCanons":
      planets.push(middleSun);
      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2,
        positionY: viewboxHeight / 2 - baseSunRadius - 6 - 6,
        speedX: 0.522,
        speedY: 0,
        radius: 6,
      });
      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2 - baseSunRadius - 6 - 6,
        positionY: viewboxHeight / 2,
        speedX: 0,
        speedY: -0.48,
        radius: 6,
      });
      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2 + baseSunRadius + 6 + 6,
        positionY: viewboxHeight / 2,
        speedX: 0,
        speedY: 0.6,
        radius: 6,
      });
      shipState.asteroids.push({
        mass: baseShipMass,
        positionX: viewboxWidth / 2,
        positionY: viewboxHeight / 2 + baseSunRadius + 6 + 6,
        speedX: -0.8,
        speedY: 0,
        radius: 6,
      });
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
      spaceState.setZoom(-2.0);
      break;
    case "sol":
      planets.push(sol);
      planets.push(mercury);
      planets.push(venus);
      planets.push(earth);
      planets.push(mars);
      planets.push(jupiter);
      planets.push(saturn);
      planets.push(uranus);
      planets.push(pluto);
      spaceState.setZoom(-2.3);
      break;
    case "blender":
      planets.push(getOrbitingPlanet(baseBlackHoleMass / 2, 30, 400, 400));
      planets.push(
        getOrbitingPlanet(baseBlackHoleMass / 2, 30, 400, 400, Math.PI)
      );
      planets.push(
        getOrbitingPlanet(baseBlackHoleMass / 2, 30, 900, 900, 0, -1)
      );
      planets.push(
        getOrbitingPlanet(baseBlackHoleMass / 2, 30, 900, 900, Math.PI, -1)
      );
      planets.push(getOrbitingPlanet(baseBlackHoleMass / 2, 30, 1500, 1500));
      planets.push(
        getOrbitingPlanet(baseBlackHoleMass / 2, 30, 1500, 1500, Math.PI)
      );
      spaceState.setZoom(-2.0);
  }
};
