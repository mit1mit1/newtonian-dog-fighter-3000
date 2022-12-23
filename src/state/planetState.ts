import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";
import type { Stage } from "@/types";
import { reactive } from "vue";

type PlanetData = {
  positionX: number;
  positionY: number;
  radius: number;
  mass: number;
  resistanceMultiplier: number;
};

const westBigPlanet = {
  positionX: 0.5 * viewboxWidth - 290,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: 1,
  resistanceMultiplier: 0.9999,
};

const eastBigPlanet = {
  positionX: 0.5 * viewboxWidth + 290,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: 1,
  resistanceMultiplier: 0.9999,
};

const northBigPlanet = {
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight - 200,
  radius: 30,
  mass: 1,
  resistanceMultiplier: 0.9999,
};

const southBigPlanet = {
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight + 200,
  radius: 30,
  mass: 1,
  resistanceMultiplier: 0.9999,
};

const middleSun = {
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: 100,
  mass: 39,
  resistanceMultiplier: 0.9997,
};

const farWestBlackHole = {
  positionX: 0.5 * viewboxWidth - 400,
  positionY: 0.5 * viewboxHeight,
  radius: 20,
  mass: 100,
  resistanceMultiplier: 0.999,
};

const middleBlackHole = {
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: 20,
  mass: 100,
  resistanceMultiplier: 0.999,
};

const westSun = {
  positionX: 0.5 * viewboxWidth - 200,
  positionY: 0.5 * viewboxHeight,
  radius: 80,
  mass: 33,
  resistanceMultiplier: 0.9997,
};

const eastSun = {
  positionX: 0.5 * viewboxWidth + 200,
  positionY: 0.5 * viewboxHeight,
  radius: 80,
  mass: 33,
  resistanceMultiplier: 0.9997,
};

const northWestLittlePlanet = {
  positionX: 0.5 * viewboxWidth - 150,
  positionY: 0.5 * viewboxHeight - 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const northEastLittlePlanet = {
  positionX: 0.5 * viewboxWidth + 150,
  positionY: 0.5 * viewboxHeight - 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const southWestLittlePlanet = {
  positionX: 0.5 * viewboxWidth - 150,
  positionY: 0.5 * viewboxHeight + 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const southEastLittlePlanet = {
  positionX: 0.5 * viewboxWidth + 150,
  positionY: 0.5 * viewboxHeight + 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const planet3 = {
  positionX: 400,
  positionY: 310,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const planet4 = {
  positionX: 400,
  positionY: 230,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const planet5 = {
  positionX: 700,
  positionY: 310,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const planet6 = {
  positionX: 700,
  positionY: 230,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

export const planets = reactive([] as Array<PlanetData>);

export const setPlanetData = (stage: Stage) => {
  planets.length = 0;
  if (stage === "battlefield") {
    planets.push(middleSun);
    planets.push(westBigPlanet);
    planets.push(eastBigPlanet);
    planets.push(planet3);
    planets.push(planet4);
    planets.push(planet5);
    planets.push(planet6);
  } else if (stage === "finalDestination") {
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
  }
};
