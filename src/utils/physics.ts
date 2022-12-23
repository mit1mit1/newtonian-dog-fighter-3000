import type { MoveableSphereData } from "@/types";
import {
  directionMultiplier,
  distanceSquared,
  xComponent,
  yComponent,
} from "./math";

const emptySpaceResistanceMultiplier = 0.999995;

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
  if (d2 < 4) {
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
      d2 ** 3
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
  if (d2 < (0.25 * planetData.radius) ** 2) {
    return 0;
  } else if (d2 < planetData.radius ** 2) {
    return (
      (0.01 *
        planetData.mass *
        directionMultiplier(shipData.positionY, planetData.positionY) *
        yComponent(
          shipData.positionX,
          planetData.positionX,
          shipData.positionY,
          planetData.positionY
        )) /
      d2
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

export const resistanceAdjustmentX = (
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
  if (
    distanceSquared(
      planetData.positionX,
      shipData.positionX,
      planetData.positionY,
      shipData.positionY
    ) >
    (planetData.radius + shipData.radius) ** 2
  ) {
    return shipData.speedX * emptySpaceResistanceMultiplier;
  }
  return shipData.speedX * planetData.resistanceMultiplier;
};
export const resistanceAdjustmentY = (
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
  if (
    distanceSquared(
      planetData.positionX,
      shipData.positionX,
      planetData.positionY,
      shipData.positionY
    ) >
    (planetData.radius + shipData.radius) ** 2
  ) {
    return shipData.speedY * emptySpaceResistanceMultiplier;
  }
  return shipData.speedY * planetData.resistanceMultiplier;
};

export const collisionFixX = (
  planetData: { radius: number; positionX: number; positionY: number },
  shipData: {
    positionX: number;
    positionY: number;
    radius: number;
    speedX: number;
    speedY: number;
  }
) => {
  if (
    distanceSquared(
      planetData.positionX,
      shipData.positionX,
      planetData.positionY,
      shipData.positionY
    ) >
    (planetData.radius + shipData.radius) ** 2
  ) {
    return shipData.positionX;
  }
  return (
    planetData.positionX -
    directionMultiplier(shipData.positionX, planetData.positionX) *
      xComponent(
        shipData.positionX,
        planetData.positionX,
        shipData.positionY,
        planetData.positionY
      ) *
      (planetData.radius + shipData.radius + 3)
  );
};
export const collisionFixY = (
  planetData: { radius: number; positionX: number; positionY: number },
  shipData: {
    positionX: number;
    positionY: number;
    radius: number;
    speedX: number;
    speedY: number;
  }
) => {
  if (
    distanceSquared(
      planetData.positionX,
      shipData.positionX,
      planetData.positionY,
      shipData.positionY
    ) >
    (planetData.radius + shipData.radius) ** 2
  ) {
    return shipData.positionY;
  }

  return (
    planetData.positionY -
    directionMultiplier(shipData.positionY, planetData.positionY) *
      yComponent(
        shipData.positionX,
        planetData.positionX,
        shipData.positionY,
        planetData.positionY
      ) *
      (planetData.radius + shipData.radius + 3)
  );
};

export const density = ({
  mass,
  radius,
}: {
  radius?: number;
  mass?: number;
}) => {
  return (mass ?? 0) / (Math.PI * (radius ?? 1) ** 2);
};

export const densityColorMultiplier = (
  {
    mass,
    radius,
  }: {
    radius?: number;
    mass?: number;
  },
  seed: number
) => {
  return (
    Math.floor(
      ((254 * density({ mass, radius })) /
        (density({ mass, radius }) * seed + 0.002)) %
        254
    ) *
      seed +
    1
  );
};

export const applyCollisionSpeedChange = (
  firstObjectData: MoveableSphereData,
  secondObjectData: MoveableSphereData
) => {
  if (
    distanceSquared(
      firstObjectData.positionX,
      secondObjectData.positionX,
      firstObjectData.positionY,
      secondObjectData.positionY
    ) >
    (firstObjectData.radius + secondObjectData.radius) ** 2
  ) {
    return;
  }
  const firstSpeedX = firstObjectData.speedX;
  const secondSpeedX = secondObjectData.speedX;
  const firstSpeedY = firstObjectData.speedY;
  const secondSpeedY = secondObjectData.speedY;
  firstObjectData.speedX = 0.2 * firstSpeedX + 0.85 * secondSpeedX;
  firstObjectData.speedY = 0.2 * firstSpeedY + 0.85 * secondSpeedY;
  secondObjectData.speedX = 0.2 * secondSpeedX + 0.85 * firstSpeedX;
  secondObjectData.speedY = 0.2 * secondSpeedY + 0.85 * firstSpeedY;
};
