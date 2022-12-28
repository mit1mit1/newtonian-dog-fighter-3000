import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";
import { baseShipMass } from "@/constants/ships";
import type { MoveableSphereData, Stage } from "@/types";
import { reactive } from "vue";

export const asteroids = reactive([] as Array<MoveableSphereData>);

export const setAsteroidData = (stage: Stage) => {
  asteroids.length = 0;
  if (stage === "junkyard") {
    asteroids.push({
      mass: baseShipMass,
      positionX: viewboxWidth / 2,
      positionY: viewboxHeight / 2 + 200,
      speedX: 0.15,
      speedY: 0.001,
      radius: 6,
    });
    asteroids.push({
      mass: baseShipMass,
      positionX: viewboxWidth / 2,
      positionY: viewboxHeight / 2 - 200,
      speedX: -0.15,
      speedY: -0.001,
      radius: 6,
    });
    asteroids.push({
      mass: baseShipMass,
      positionX: viewboxWidth / 2 + 300,
      positionY: viewboxHeight / 2,
      speedX: -0.001,
      speedY: -0.3,
      radius: 6,
    });
    asteroids.push({
      mass: baseShipMass,
      positionX: viewboxWidth / 2 - 300,
      positionY: viewboxHeight / 2,
      speedX: 0.001,
      speedY: 0.3,
      radius: 6,
    });
    asteroids.push({
      mass: baseShipMass,
      positionX: viewboxWidth / 2,
      positionY: viewboxHeight / 2 + 300,
      speedX: 0.3,
      speedY: 0.001,
      radius: 6,
    });
    asteroids.push({
      mass: baseShipMass,
      positionX: viewboxWidth / 2,
      positionY: viewboxHeight / 2 - 300,
      speedX: -0.3,
      speedY: -0.001,
      radius: 6,
    });
  } else if (stage === "pinball") {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        asteroids.push({
          mass: baseShipMass,
          positionX: viewboxWidth / 2 - 450 + 225 * i,
          positionY: viewboxHeight / 2 - 225 + 225 * j,
          speedX: 0,
          speedY: 0,
          radius: 6,
        });
      }
    }
  }
};