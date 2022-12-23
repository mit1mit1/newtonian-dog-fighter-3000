import type { Stage } from "@/types";
import { reactive } from "vue";

type PlanetData = {
  positionX: number;
  positionY: number;
  radius: number;
  mass: number;
  resistanceMultiplier: number;
};

const planet1Data = {
  positionX: 260,
  positionY: 270,
  radius: 30,
  mass: 1,
  resistanceMultiplier: 0.9999,
};

const planet2Data = {
  positionX: 840,
  positionY: 270,
  radius: 30,
  mass: 1,
  resistanceMultiplier: 0.9999,
};

const middleSunData = {
  positionX: 550,
  positionY: 270,
  radius: 100,
  mass: 39,
  resistanceMultiplier: 0.9997,
};

const leftSunData = {
  positionX: 400,
  positionY: 270,
  radius: 80,
  mass: 33,
  resistanceMultiplier: 0.9997,
};

const rightSunData = {
  positionX: 700,
  positionY: 270,
  radius: 80,
  mass: 33,
  resistanceMultiplier: 0.9997,
};

const planet3Data = {
  positionX: 400,
  positionY: 310,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const planet4Data = {
  positionX: 400,
  positionY: 230,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const planet5Data = {
  positionX: 700,
  positionY: 310,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: 0.9999,
};

const planet6Data = {
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
    planets.push(middleSunData);
    planets.push(planet1Data);
    planets.push(planet2Data);
    planets.push(planet3Data);
    planets.push(planet4Data);
    planets.push(planet5Data);
    planets.push(planet6Data);
  } else if (stage === "finalDestination") {
    planets.push(middleSunData);
  } else if (stage === "pokemonStadium") {
    planets.push(leftSunData);
    planets.push(rightSunData);
  }
};
