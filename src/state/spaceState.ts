// store.js
import { reactive } from "vue";
import { shipState } from "./shipState";
import { middleBlackHole } from "@/constants/stage";
import { checkpoints } from "./checkpointState";
import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";
import { getNextTarget } from "@/utils/game";
import { goals } from "./goalState";

export type CameraMode = "fixed" | 0 | 1;
export const fixedCamera: CameraMode = "fixed";
type GameMode = "race" | "battle";

export const spaceState = reactive<{
  isStarted: boolean;
  cameraMode: CameraMode;
  setCameraMode: (newCameraMode: CameraMode) => void;
  gameMode: GameMode;
  setGameMode: (newGameMode: GameMode) => void
  zoom: number;
  autoZoom: boolean;
  setZoom: (n: number) => void;
  framesSinceZoomOut: number;
}>({
  isStarted: false,
  cameraMode: 0,
  setCameraMode(newCameraMode: CameraMode) {
    this.cameraMode = newCameraMode;
  },
  gameMode: "race",
  setGameMode(newGameMode: GameMode) {
    this.gameMode = newGameMode;
  },
  zoom: -1,
  setZoom(n: number) {
    this.zoom = n;
    this.framesSinceZoomOut = 0;
  },
  autoZoom: false,
  framesSinceZoomOut: 10,
});

export const getFocalPoint = () =>
  spaceState.cameraMode !== fixedCamera &&
  shipState.ships[spaceState.cameraMode as number]
    ? shipState.ships[spaceState.cameraMode as number]
    : middleBlackHole;

const baseZoom = -1;
const minimumZoom = -2.9;

export const adjustZoom = () => {
  if (!spaceState.autoZoom) {
    return;
  }
  const focalPoint = getFocalPoint();
  const importantObjects = [];
  let hasZoomed = false;
  if (shipState.numberOfPlayers > 0) {
    importantObjects.push(shipState.ships[0]);
    if (spaceState.gameMode === "race") {
      const nextTarget = getNextTarget(shipState.ships[0], goals, checkpoints);
      if (nextTarget) {
        importantObjects.push(nextTarget);
      }
    }
  }
  if (shipState.numberOfPlayers > 1) {
    importantObjects.push(shipState.ships[1]);
    if (spaceState.gameMode === "race") {
      const nextTarget = getNextTarget(shipState.ships[1], goals, checkpoints);
      if (nextTarget) {
        importantObjects.push(nextTarget);
      }
    }
  }
  for (const importantObject of importantObjects.filter(
    (importantObject) => !!importantObject
  )) {
    if (
      Math.abs(importantObject.positionX - focalPoint.positionX) *
        Math.pow(2, spaceState.zoom + 1.1) >
      viewboxWidth * 0.75
    ) {
      if (
        Math.abs(importantObject.positionX - focalPoint.positionX) *
          Math.pow(2, spaceState.zoom + 1.05) >
        viewboxWidth * 0.75
      ) {
        if (spaceState.zoom > minimumZoom) {
          spaceState.zoom -= 0.005;
        }
      }
      spaceState.framesSinceZoomOut = 0;
      hasZoomed = true;
      break;
    }
    if (
      Math.abs(importantObject.positionY - focalPoint.positionY) *
        Math.pow(2, spaceState.zoom + 1.1) >
      viewboxHeight * 0.75
    ) {
      if (
        Math.abs(importantObject.positionY - focalPoint.positionY) *
          Math.pow(2, spaceState.zoom + 1.05) >
        viewboxHeight * 0.75
      ) {
        if (spaceState.zoom > minimumZoom) {
          spaceState.zoom -= 0.005;
        }
      }
      spaceState.framesSinceZoomOut = 0;
      hasZoomed = true;
      break;
    }
  }
  if (
    spaceState.zoom < baseZoom &&
    !hasZoomed &&
    spaceState.framesSinceZoomOut > 10
  ) {
    spaceState.zoom += 0.001;
    return;
  }
  spaceState.framesSinceZoomOut++;
};
