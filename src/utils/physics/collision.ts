import type { MoveableSphereData } from "@/types";
import { distanceSquared, isOverlapping } from "../math";
import type { ShipData } from "@/state/shipState";

const collisionElasticity = 0.9;

export const getCollisionResult = (
  firstObjectData: MoveableSphereData | ShipData,
  secondObjectData: MoveableSphereData | ShipData
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
    return false;
  }
  const firstResult = { ...firstObjectData };
  const secondResult = { ...secondObjectData };
  const firstSpeedX = firstObjectData.speedX;
  const secondSpeedX = secondObjectData.speedX;
  const firstSpeedY = firstObjectData.speedY;
  const secondSpeedY = secondObjectData.speedY;

  firstResult.speedX =
    (1 - collisionElasticity) * firstSpeedX +
    (collisionElasticity * secondSpeedX * (secondObjectData.mass || 1)) /
      (firstObjectData.mass || 1);
  firstResult.speedY =
    (1 - collisionElasticity) * firstSpeedY +
    (collisionElasticity * secondSpeedY * (secondObjectData.mass || 1)) /
      (firstObjectData.mass || 1);
  secondResult.speedX =
    (1 - collisionElasticity) * secondSpeedX +
    (collisionElasticity * firstSpeedX * (firstObjectData.mass || 1)) /
      (secondObjectData.mass || 1);
  secondResult.speedY =
    (1 - collisionElasticity) * secondSpeedY +
    (collisionElasticity * firstSpeedY * (firstObjectData.mass || 1)) /
      (secondObjectData.mass || 1);
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
    firstResult.positionX = firstObjectData.positionX - firstSpeedX;
    firstResult.positionY = firstObjectData.positionY - firstSpeedY;
    secondResult.positionX = secondObjectData.positionX - secondSpeedX;
    secondResult.positionY = secondObjectData.positionY - secondSpeedY;
    firstResult.positionX = firstResult.positionX - firstResult.speedX;
    firstResult.positionY = firstResult.positionY - firstResult.speedY;

    secondResult.positionX = secondResult.positionX - secondResult.speedX;
    secondResult.positionY = secondResult.positionY - secondResult.speedY;
    // TODO: might need to skip moving for this turn as well?
    // applyCollisionSpeedChange(firstObjectData, secondObjectData);
  }
  return [firstResult, secondResult];
};
