import {
  directionMultiplier,
  distanceSquared,
  xComponent,
  yComponent,
} from "../math";

export const gravityAccelerationX = (
  planetData: {
    radius: number;
    mass: number;
    positionX: number;
    positionY: number;
  },
  shipData: { positionX: number; positionY: number }
) => {
  const d2 = distanceSquared(
    shipData.positionX,
    planetData.positionX,
    shipData.positionY,
    planetData.positionY
  );
  if (d2 < Math.max((0.125 * planetData.radius) ** 2, 8)) {
    return 0;
  } else if (d2 < planetData.radius ** 2) {
    return (
      (planetData.mass *
        directionMultiplier(shipData.positionX, planetData.positionX) *
        xComponent(
          shipData.positionX,
          planetData.positionX,
          shipData.positionY,
          planetData.positionY
        )) /
      d2 ** 1.5
    );
  }
  return (
    (planetData.mass *
      directionMultiplier(shipData.positionX, planetData.positionX) *
      xComponent(
        shipData.positionX,
        planetData.positionX,
        shipData.positionY,
        planetData.positionY
      )) /
    d2
  );
};
export const gravityAccelerationY = (
  planetData: {
    radius: number;
    mass: number;
    positionX: number;
    positionY: number;
  },
  shipData: { positionX: number; positionY: number }
) => {
  const d2 = distanceSquared(
    shipData.positionX,
    planetData.positionX,
    shipData.positionY,
    planetData.positionY
  );
  if (d2 < Math.max((0.125 * planetData.radius) ** 2, 8)) {
    return 0;
  } else if (d2 < planetData.radius ** 2) {
    return (
      (planetData.mass *
        directionMultiplier(shipData.positionY, planetData.positionY) *
        yComponent(
          shipData.positionX,
          planetData.positionX,
          shipData.positionY,
          planetData.positionY
        )) /
      d2 ** 1.5
    );
  }
  return (
    (planetData.mass *
      directionMultiplier(shipData.positionY, planetData.positionY) *
      yComponent(
        shipData.positionX,
        planetData.positionX,
        shipData.positionY,
        planetData.positionY
      )) /
    d2
  );
};
