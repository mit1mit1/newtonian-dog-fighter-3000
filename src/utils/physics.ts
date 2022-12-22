import {
  directionMultiplier,
  distanceSquared,
  xComponent,
  yComponent,
} from "./math";

const emptySpaceResistanceMultiplier = 0.99999;

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

export const collisionAccelerationX = (
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
    return 0;
  }
  return (
    -1.75 *
    shipData.speedX *
    xComponent(
      shipData.positionX,
      planetData.positionX,
      shipData.positionY,
      planetData.positionY
    )
  );
};
export const collisionAccelerationY = (
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
    return 0;
  }
  return (
    -1.75 *
    shipData.speedY *
    yComponent(
      shipData.positionX,
      planetData.positionX,
      shipData.positionY,
      planetData.positionY
    )
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
  console.log('yo')
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
