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
  mass: baseSunRadius / 2,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 290 * Math.cos(frameNumber / 280),
      positionY: 0.5 * viewboxHeight + 290 * Math.sin(frameNumber / 280),
    };
  },
};

export const eastOrbitingBigPlanet: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth + 290,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: baseSunRadius / 2,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth + 290 * Math.cos(frameNumber / 280),
      positionY: 0.5 * viewboxHeight - 290 * Math.sin(frameNumber / 280),
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

export const sol = {
  damage: 1,
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: baseSunRadius,
  mass: 69,
  resistanceMultiplier: baseSunResistanceMultiplyer,
};

export const getOrbitingPlanet = (
  planetMass: number,
  planetRadius: number,
  orbitRadius: number,
  slownessDivider: number,
  startAngle = 0,
  orbitDirectionMultiplier: -1 | 1 = 1, 
  centreX = 0.5 * viewboxWidth,
  centreY = 0.5 * viewboxHeight,
): PlanetData => ({
  damage: 1,
  positionX: centreX - orbitRadius * Math.cos(startAngle),
  positionY: centreY + orbitRadius * Math.sin(startAngle),
  radius: planetRadius,
  mass: planetMass,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX:
        centreX -
        orbitRadius * Math.cos(startAngle + orbitDirectionMultiplier * frameNumber / slownessDivider),
      positionY:
        centreY +
        orbitRadius * Math.sin(startAngle + orbitDirectionMultiplier * frameNumber / slownessDivider),
    };
  },
});

export const mercury: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 200,
  positionY: 0.5 * viewboxHeight,
  radius: 10,
  mass: 5,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 200 * Math.cos(frameNumber / 280),
      positionY: 0.5 * viewboxHeight + 200 * Math.sin(frameNumber / 280),
    };
  },
};

export const venus: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 490,
  positionY: 0.5 * viewboxHeight,
  radius: 20,
  mass: 10,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 490 * Math.cos(frameNumber / 450),
      positionY: 0.5 * viewboxHeight + 490 * Math.sin(frameNumber / 450),
    };
  },
};

export const earth: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 690,
  positionY: 0.5 * viewboxHeight,
  radius: 20,
  mass: 10,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 690 * Math.cos(frameNumber / 620),
      positionY: 0.5 * viewboxHeight + 690 * Math.sin(frameNumber / 620),
    };
  },
};

export const mars: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 820,
  positionY: 0.5 * viewboxHeight,
  radius: 10,
  mass: 3,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 820 * Math.cos(frameNumber / 780),
      positionY: 0.5 * viewboxHeight + 820 * Math.sin(frameNumber / 780),
    };
  },
};

export const jupiter: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 1080,
  positionY: 0.5 * viewboxHeight,
  radius: 30,
  mass: 50,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 1080 * Math.cos(frameNumber / 1300),
      positionY: 0.5 * viewboxHeight + 1080 * Math.sin(frameNumber / 1300),
    };
  },
};

export const saturn: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 1380,
  positionY: 0.5 * viewboxHeight,
  radius: 25,
  mass: 40,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 1380 * Math.cos(frameNumber / 1400),
      positionY: 0.5 * viewboxHeight + 1380 * Math.sin(frameNumber / 1400),
    };
  },
};

export const uranus: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 1590,
  positionY: 0.5 * viewboxHeight,
  radius: 23,
  mass: 37,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 1590 * Math.cos(frameNumber / 1600),
      positionY: 0.5 * viewboxHeight + 1590 * Math.sin(frameNumber / 1600),
    };
  },
};

export const pluto: PlanetData = {
  damage: 1,
  positionX: 0.5 * viewboxWidth - 1680,
  positionY: 0.5 * viewboxHeight,
  radius: 5,
  mass: 2,
  resistanceMultiplier: basePlanetResistanceMultiplyer,
  getNextPlanetData: (frameNumber: number, currentPlanetData: PlanetData) => {
    return {
      ...currentPlanetData,
      positionX: 0.5 * viewboxWidth - 1680 * Math.cos(frameNumber / 2200),
      positionY: 0.5 * viewboxHeight + 1680 * Math.sin(frameNumber / 2200),
    };
  },
};
