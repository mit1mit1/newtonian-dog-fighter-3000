import {
  blastZoneCenterX,
  blastZoneCenterY,
  blastZoneRadiusX,
  blastZoneRadiusY,
} from "@/constants/mapNumbers";
import { distanceSquared } from "./math";
import { frameMilliseconds } from "@/constants/physics";

export const getPlanetDamage = (
  shipData: { radius: number; positionX: number; positionY: number },
  planetData: {
    positionX: number;
    positionY: number;
    radius: number;
    damage: number;
  }
) => {
  if (
    distanceSquared(
      shipData.positionX,
      planetData.positionX,
      shipData.positionY,
      planetData.positionY
    ) <
    (shipData.radius + 2 + planetData.radius) ** 2
  ) {
    return planetData.damage;
  }
  return 0;
};

export const getOutOfMapDamage = (shipData: {
  positionX: number;
  positionY: number;
}) => {
  if (
    ((shipData.positionX - blastZoneCenterX) / blastZoneRadiusX) ** 2 +
      ((shipData.positionY - blastZoneCenterY) / blastZoneRadiusY) ** 2 >
    1
  ) {
    return 10;
  }
  return 0;
};

export const isWithinPercentOfBlastZone = (
  shipData: {
    positionX: number;
    positionY: number;
  },
  percent: number
) => {
  const smallestRadii =
    blastZoneRadiusX > blastZoneRadiusY ? blastZoneRadiusY : blastZoneRadiusX;
  const safeCircleRadius = smallestRadii * percent;
  if (
    ((shipData.positionX - blastZoneCenterX) / safeCircleRadius) ** 2 +
      ((shipData.positionY - blastZoneCenterY) / safeCircleRadius) ** 2 >
    1
  ) {
    return true;
  }
  return false;
};

export const getSquaredDistanceFromCenter = (shipData: {
  positionX: number;
  positionY: number;
}) => {
  return (
    (shipData.positionX - blastZoneCenterX) ** 2 +
    (shipData.positionY - blastZoneCenterY) ** 2
  );
};

export const secondsSinceStart = (
  shipData: { startFrame?: number },
  frameNumber: number
) =>
  (
    ((frameNumber - (shipData.startFrame || 0)) * frameMilliseconds) /
    1000
  ).toFixed(1);
