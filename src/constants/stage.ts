import type { PlanetData } from "@/types";
import { viewboxHeight, viewboxWidth } from "./mapNumbers";

const baseSunResistanceMultiplyer = 0.9997;
const basePlanetResistanceMultiplyer = 0.9999;
export const baseBlackHoleResistanceMultiplyer = 0.999;

export const baseSunRadius = 100;
export const baseBlackHoleMass = 100;

export const westOrbitingBigPlanet: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 290,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 290 * Math.cos(frameNumber / 180),
      positionY: 0.5 * viewboxHeight + 290 * Math.sin(frameNumber / 180),
    };
  },
};

export const eastOrbitingBigPlanet: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 290,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth + 290 * Math.cos(frameNumber / 180),
      positionY: 0.5 * viewboxHeight - 290 * Math.sin(frameNumber / 180),
    };
  },
};

export const westBigPlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 290,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const eastBigPlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 290,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const northBigPlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight - 200,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const southBigPlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight + 200,
  radius: 30,
  mass: 1,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const gaseousSystem = {
  damage: 0,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: 500,
  mass: 96,
  resistanceMultiplier: 1,
  damaging: false,
};

export const middleSun = {
  damage: 1,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: baseSunRadius,
  mass: 39,
  resistanceMultiplier: baseSunResistanceMultiplyer,
};

export const farWestBlackHole = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 400,
  positionY: 0.5 * viewboxHeight,
  radius: 20,
  mass: baseBlackHoleMass,
  resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
};

export const middleBlackHole = {
  damage: 1,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: 20,
  mass: baseBlackHoleMass,
  resistanceMultiplier: baseBlackHoleResistanceMultiplyer,
};

export const westSun = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 200,
  positionY: 0.5 * viewboxHeight,
  radius: 80,
  mass: 33,
  resistanceMultiplier: baseSunResistanceMultiplyer,
};

export const eastSun = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 200,
  positionY: 0.5 * viewboxHeight,
  radius: 80,
  mass: 33,
  resistanceMultiplier: baseSunResistanceMultiplyer,
};

export const northWestLittlePlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 150,
  positionY: 0.5 * viewboxHeight - 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const northEastLittlePlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 150,
  positionY: 0.5 * viewboxHeight - 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const southWestLittlePlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 150,
  positionY: 0.5 * viewboxHeight + 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const southEastLittlePlanet = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 150,
  positionY: 0.5 * viewboxHeight + 150,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const planet3 = {
  damage: 1,
  positionX: 400,
  positionY: 310,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const planet4 = {
  damage: 1,
  positionX: 400,
  positionY: 230,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const planet5 = {
  damage: 1,
  positionX: 700,
  positionY: 310,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};

export const planet6 = {
  damage: 1,
  positionX: 700,
  positionY: 230,
  radius: 22,
  mass: 0.5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
};
