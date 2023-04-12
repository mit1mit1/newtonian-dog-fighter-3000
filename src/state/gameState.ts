import { reactive } from "vue";
import { spaceState } from "./spaceState";
import { frameMilliseconds } from "@/constants/physics";
import { setupStage } from "@/utils/setupStage";
import { checkpoints } from "./checkpointState";
import { planets } from "./planetState";
import { applyAI, shipState, type ShipData } from "./shipState";
import type { Stage } from "@/types";
import { secondsSinceStart } from "@/utils/game";
import { goals } from "./goalState";

const hasCompleted = (shipData: ShipData) => {
  const finishedCheckpoints =
    checkpoints.length < 1 ||
    (shipData.nextCheckpoint && shipData.nextCheckpoint >= checkpoints.length);

  const finishedGoals =
    goals.length < 1 || shipData.completedGoals.length === goals.length;

  return finishedCheckpoints && finishedGoals;
};

export const gameState: {
  stage: Stage | "random";
  frameNumber: number;
  player2AI: boolean;
  isPaused: boolean;
} = reactive({
  stage: "random",
  frameNumber: 0,
  player2AI: false,
  isPaused: true,
});

const updateShipData = () => {
  // console.time(`frame${gameState.frameNumber}`)
  if (spaceState.isStarted) {
    if (gameState.player2AI) {
      applyAI(1);
    }
    shipState.moveForwardFrame();
    planets.forEach((planet, index) => {
      if (planet.getNextPlanetData) {
        planets[index] = planet.getNextPlanetData(
          gameState.frameNumber,
          planet
        );
      }
    });
    shipState.ships.forEach((shipData, index) => {
      if (shipData.health <= 0 || hasCompleted(shipData)) {
        if (spaceState.gameMode === "race" && shipData.health > 0) {
          const localStorageIndex = gameState.stage + "record";
          const previousRecord = localStorage.getItem(localStorageIndex);
          const frames = gameState.frameNumber - (shipData?.startFrame || 0);
          if (!previousRecord || frames < parseInt(previousRecord)) {
            localStorage.setItem(localStorageIndex, frames.toString());
            alert(
              "new record - ship " +
                index +
                " finished " +
                gameState.stage +
                " in " +
                secondsSinceStart(shipData, gameState.frameNumber) +
                " seconds"
            );
          } else {
            alert(
              "ship " +
                index +
                " finished " +
                gameState.stage +
                " in " +
                secondsSinceStart(shipData, gameState.frameNumber) +
                " seconds"
            );
          }
        }
        spaceState.isStarted = false;
        togglePause();
      }
    });
  }
  // console.timeEnd(`frame${gameState.frameNumber - 1}`)
};

let interval: NodeJS.Timer;
export const togglePause = () => {
  if (gameState.isPaused) {
    if (!spaceState.isStarted) {
      setupStage(
        "random",
        spaceState.gameMode === "race"
      );
      setTimeout(() => {
        spaceState.isStarted = true;
      }, 500);
    }
    interval = setInterval(updateShipData, frameMilliseconds);
  } else {
    clearInterval(interval);
  }
  gameState.isPaused = !gameState.isPaused;
};

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "p" || e.key === "Escape") {
    togglePause();
  }
});
