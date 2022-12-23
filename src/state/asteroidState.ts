import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";
import type { MoveableSphereData, Stage } from "@/types";
import { reactive } from "vue";

export const asteroids = reactive([] as Array<MoveableSphereData>);

export const setAsteroidData = (stage: Stage) => {
  asteroids.length = 0;
  if (stage === "junkyard") {
    asteroids.push({
      positionX: viewboxWidth / 2,
      positionY: viewboxHeight / 2,
      speedX: 0.01,
      speedY: 0.01,
      radius: 5,
    });
  }
};
