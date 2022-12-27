export const distanceSquared = (
  x1: number,
  x2: number,
  y1: number,
  y2: number
) => {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2;
};

export const directionMultiplier = (x1: number, x2: number) => {
  if (x1 === x2) {
    return 0;
  }
  return (x2 - x1) / Math.abs(x1 - x2 ?? 1);
};

export const xComponent = (x1: number, x2: number, y1: number, y2: number) => {
  return (x2 - x1) ** 2 / ((x2 - x1) ** 2 + (y2 - y1) ** 2 || 1);
};

export const yComponent = (x1: number, x2: number, y1: number, y2: number) => {
  return (y2 - y1) ** 2 / ((x2 - x1) ** 2 + (y2 - y1) ** 2 || 1);
};

export const isOverlapping = (
  circle1: { positionX: number; positionY: number; radius: number },
  circle2: { positionX: number; positionY: number; radius: number }
) => {
  return (
    distanceSquared(
      circle1.positionX,
      circle2.positionX,
      circle1.positionY,
      circle2.positionY
    ) <
    (circle1.radius + circle2.radius) ** 2
  );
};
