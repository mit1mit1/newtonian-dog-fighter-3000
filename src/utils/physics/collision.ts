import type { MoveableSphereData } from "@/types";
import { distanceSquared, isOverlapping } from "../math";
import type { ShipData } from "@/state/shipState";
import { frameSpeedMultiplier } from "@/constants/physics";

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
        positionX:
          firstObjectData.positionX +
          frameSpeedMultiplier * firstObjectData.speedX,
        positionY:
          firstObjectData.positionY +
          frameSpeedMultiplier * firstObjectData.speedY,
      },
      {
        ...secondObjectData,
        positionX:
          secondObjectData.positionX +
          frameSpeedMultiplier * secondObjectData.speedX,
        positionY:
          secondObjectData.positionY +
          frameSpeedMultiplier * secondObjectData.speedY,
      }
    )
  ) {
    firstResult.positionX =
      firstObjectData.positionX - frameSpeedMultiplier * firstSpeedX;
    firstResult.positionY =
      firstObjectData.positionY - frameSpeedMultiplier * firstSpeedY;
    secondResult.positionX =
      secondObjectData.positionX - frameSpeedMultiplier * secondSpeedX;
    secondResult.positionY =
      secondObjectData.positionY - frameSpeedMultiplier * secondSpeedY;
    firstResult.positionX =
      firstResult.positionX - frameSpeedMultiplier * firstResult.speedX;
    firstResult.positionY =
      firstResult.positionY - frameSpeedMultiplier * firstResult.speedY;

    secondResult.positionX =
      secondResult.positionX - frameSpeedMultiplier * secondResult.speedX;
    secondResult.positionY =
      secondResult.positionY - frameSpeedMultiplier * secondResult.speedY;
    // TODO: might need to skip moving for this turn as well?
    // applyCollisionSpeedChange(firstObjectData, secondObjectData);
  }
  return [firstResult, secondResult];
};
