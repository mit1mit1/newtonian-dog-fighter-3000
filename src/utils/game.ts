import {
  blastZoneCenterX,
  blastZoneCenterY,
  blastZoneRadiusX,
  blastZoneRadiusY,
} from "@/constants/mapNumbers";
import { distanceSquared } from "./math";

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
