import { frameSpeedMultiplier } from "@/constants/physics";
import { isOverlapping } from "../math";

export const emptySpaceResistanceMultiplier = 0.999995;

export const resistanceAdjustedXSpeed = (
  planetData: {
    radius: number;
    positionX: number;
    positionY: number;
    resistanceMultiplier: number;
  },
  shipData: {
    positionX: number;
    positionY: number;
    radius: number;
    speedX: number;
    speedY: number;
  }
) => {
  if (isOverlapping(planetData, shipData)) {
    return (
      shipData.speedX * planetData.resistanceMultiplier ** frameSpeedMultiplier
    );
  }
  return (
    shipData.speedX * emptySpaceResistanceMultiplier ** frameSpeedMultiplier
  );
};
export const resistanceAdjustedYSpeed = (
  planetData: {
    radius: number;
    positionX: number;
    positionY: number;
    resistanceMultiplier: number;
  },
  shipData: {
    positionX: number;
    positionY: number;
    radius: number;
    speedX: number;
    speedY: number;
  }
) => {
  if (isOverlapping(planetData, shipData)) {
    return shipData.speedY * planetData.resistanceMultiplier;
  }
  return shipData.speedY * emptySpaceResistanceMultiplier;
};
