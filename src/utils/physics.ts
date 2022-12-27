import type { MoveableSphereData } from "@/types";
import {
  directionMultiplier,
  distanceSquared,
  isOverlapping,
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

export const applyCollisionPositionFix = (
  object1: MoveableSphereData,
  object2: MoveableSphereData
) => {
  return;
  // while (isOverlapping(object1, object2)) {
  //   object1.positionX = object1.positionX + 3 * object1.speedX;
  //   object1.positionY = object1.positionY + 3 * object1.speedY;
  //   object2.positionX = object2.positionX + 3 * object2.speedX;
  //   object2.positionY = object2.positionY + 3 * object2.speedY;
  // }
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

const collisionElasticity = 1;

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
  if (!firstObjectData.mass) {
    throw TypeError(`firstObjectData.mass is 0`);
  }
  if (!secondObjectData.mass) {
    throw TypeError(`secondObjectData.mass is 0`);
  }

  console.log(firstObjectData.speedX, firstObjectData.speedY);
  console.log(secondObjectData.speedX, secondObjectData.speedY);
  firstObjectData.speedX =
    (1 - collisionElasticity) * firstSpeedX +
    (collisionElasticity * secondSpeedX * secondObjectData.mass) /
      firstObjectData.mass;
  firstObjectData.speedY =
    (1 - collisionElasticity) * firstSpeedY +
    (collisionElasticity * secondSpeedY * secondObjectData.mass) /
      firstObjectData.mass;
  secondObjectData.speedX =
    (1 - collisionElasticity) * secondSpeedX +
    (collisionElasticity * firstSpeedX * firstObjectData.mass) /
      secondObjectData.mass;
  secondObjectData.speedY =
    (1 - collisionElasticity) * secondSpeedY +
    (collisionElasticity * firstSpeedY * firstObjectData.mass) /
      secondObjectData.mass;
  if (
    isOverlapping(
      {
        ...firstObjectData,
        positionX: firstObjectData.positionX + firstObjectData.speedX,
        positionY: firstObjectData.positionY + firstObjectData.speedY,
      },
      {
        ...secondObjectData,
        positionX: secondObjectData.positionX + secondObjectData.speedX,
        positionY: secondObjectData.positionY + secondObjectData.speedY,
      }
    )
  ) {
    firstObjectData.positionX = firstObjectData.positionX - firstSpeedX;
    firstObjectData.positionY = firstObjectData.positionY - firstSpeedY;
    secondObjectData.positionX = secondObjectData.positionX - secondSpeedX;
    secondObjectData.positionY = secondObjectData.positionY - secondSpeedY;
    firstObjectData.positionX = firstObjectData.positionX - firstObjectData.speedX;
    firstObjectData.positionY = firstObjectData.positionY - firstObjectData.speedY;
    secondObjectData.positionX = secondObjectData.positionX - secondObjectData.speedX;
    secondObjectData.positionY = secondObjectData.positionY - secondObjectData.speedY;
    // TODO: might need to skip moving for this turn as well?
    // applyCollisionSpeedChange(firstObjectData, secondObjectData);
  }
  console.log(firstObjectData.speedX, firstObjectData.speedY);
  console.log(secondObjectData.speedX, secondObjectData.speedY);
};
