import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";
import type { Stage } from "@/types";
import { reactive } from "vue";

type PlanetData = {
  positionX: number;
  positionY: number;
  radius: number;
  mass: number;
  resistanceMultiplier: number;
  damage: number;
};

const baseSunResistanceMultiplyer = 0.9997;
const basePlanetResistanceMultiplyer = 0.9999;
const baseBlackHoleResistanceMultiplyer = 0.999;
export const baseSunRadius = 100;
export const baseBlackHoleMass = 100;

const westBigPlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 290,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const eastBigPlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 290,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const northBigPlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight - 200,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const southBigPlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight + 200,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const gaseousSystem = {
  damage: 0,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: 500,
  mass: 96,
  resistanceMultiplier: 1,
  damaging: false,
};

const middleSun = {
  damage: 1,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: baseSunRadius,
  mass: 39,
  resistanceMultiplier: baseSunResistanceMultiplyer,
};

const farWestBlackHole = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 400,
  positionY: 0.5 * viewboxHeight,
  radius: 20,
  mass: baseBlackHoleMass,
  resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
};

const middleBlackHole = {
  damage: 1,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: 20,
  mass: baseBlackHoleMass,
  resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
};

const westSun = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 200,
  positionY: 0.5 * viewboxHeight,
  radius: 80,
  mass: 33,
  resistanceMultiplier: baseSunResistanceMultiplyer,
};

const eastSun = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 200,
  positionY: 0.5 * viewboxHeight,
  radius: 80,
  mass: 33,
  resistanceMultiplier: baseSunResistanceMultiplyer,
};

const northWestLittlePlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 150,
  positionY: 0.5 * viewboxHeight - 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const northEastLittlePlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 150,
  positionY: 0.5 * viewboxHeight - 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const southWestLittlePlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 150,
  positionY: 0.5 * viewboxHeight + 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const southEastLittlePlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 150,
  positionY: 0.5 * viewboxHeight + 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const planet3 = {
  damage: 1,
  positionX: 400,
  positionY: 310,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const planet4 = {
  damage: 1,
  positionX: 400,
  positionY: 230,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const planet5 = {
  damage: 1,
  positionX: 700,
  positionY: 310,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

const planet6 = {
  damage: 1,
  positionX: 700,
  positionY: 230,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const planets = reactive([] as Array<PlanetData>);

export const setPlanetData = (stage: Stage) => {
  planets.splice(0, planets.length);
  if (stage === "battlefield") {
    planets.push(middleSun);
    planets.push(westBigPlanet);
    planets.push(eastBigPlanet);
    planets.push(planet3);
    planets.push(planet4);
    planets.push(planet5);
    planets.push(planet6);
  } else if (stage === "finalDestination" || stage === "newtonsCanons") {
    planets.push(middleSun);
  } else if (stage === "pokemonStadium") {
    planets.push(westSun);
    planets.push(eastSun);
  } else if (stage === "milkyWay") {
    planets.push(middleBlackHole);
    planets.push(westBigPlanet);
    planets.push(eastBigPlanet);
    planets.push(northBigPlanet);
    planets.push(southBigPlanet);
    planets.push(northWestLittlePlanet);
    planets.push(northEastLittlePlanet);
    planets.push(southWestLittlePlanet);
    planets.push(southEastLittlePlanet);
  } else if (stage === "maw") {
    planets.push(middleBlackHole);
    planets.push(westSun);
    planets.push(eastSun);
  } else if (stage === "kongoFalls") {
    planets.push(farWestBlackHole);
    planets.push(westSun);
    planets.push(middleSun);
    planets.push(eastBigPlanet);
    planets.push(southEastLittlePlanet);
    planets.push(northEastLittlePlanet);
  } else if (stage === "junkyard") {
    planets.push(middleSun);
  } else if (stage === "pinball") {
    planets.push(gaseousSystem);
  } else if (stage === "raceCourseOne") {
    planets.push({
      damage: 1,
      positionX: 0.5 * viewboxWidth,
      positionY: 0.5 * viewboxHeight,
      radius: 20,
      mass: baseBlackHoleMass,
      resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
    }, {
      damage: 1,
      positionX: 1.5 * viewboxWidth,
      positionY: 1 * viewboxHeight,
      radius: 20,
      mass: baseBlackHoleMass,
      resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
    }, {
      damage: 1,
      positionX: 2 * viewboxWidth,
      positionY: 2 * viewboxHeight,
      radius: 20,
      mass: baseBlackHoleMass,
      resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
    }, {
      damage: 1,
      positionX: 3 * viewboxWidth,
      positionY: 2.5 * viewboxHeight,
      radius: 20,
      mass: baseBlackHoleMass,
      resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
    }, {
      damage: 1,
      positionX: 3.5 * viewboxWidth,
      positionY: 3 * viewboxHeight,
      radius: 20,
      mass: baseBlackHoleMass,
      resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
    })
  }
};
