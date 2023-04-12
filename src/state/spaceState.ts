// store.js
import type { NumberOfPlayers } from "@/types";
import { reactive } from "vue";
import { shipState } from "./shipState";
import { middleBlackHole } from "@/constants/stage";
import { goals } from "./goalState";
import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";

export type CameraMode = "fixed" | 0 | 1;
export const fixedCamera: CameraMode = "fixed";
type GameMode = "race" | "battle";

export const spaceState = reactive<{
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  cameraMode: CameraMode;
  setCameraMode: (newCameraMode: CameraMode) => void;
  gameMode: GameMode;
  setGameMode: (newGameMode: GameMode) => void;
  numberOfPlayers: NumberOfPlayers;
  setNumberOfPlayers: (n: NumberOfPlayers) => void;
  zoom: number;
  autoZoom: boolean;
  setZoom: (n: number) => void;
  framesSinceZoomOut: number;
}>({
  isStarted: false,
  setIsStarted(started: boolean) {
    this.isStarted = started;
  },
  cameraMode: 0,
  setCameraMode(newCameraMode: CameraMode) {
    this.cameraMode = newCameraMode;
  },
  gameMode: "race",
  setGameMode(newGameMode: GameMode) {
    this.gameMode = newGameMode;
  },
  numberOfPlayers: 1,
  setNumberOfPlayers(newNumbersetNumberOfPlayers: NumberOfPlayers) {
    this.numberOfPlayers = newNumbersetNumberOfPlayers;
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
  if (spaceState.numberOfPlayers > 0) {
    importantObjects.push(shipState.ships[0]);
    if (spaceState.gameMode === "race") {
      importantObjects.push(goals[shipState.ships[0].nextGoal]);
    }
  }
  if (spaceState.numberOfPlayers > 1) {
    importantObjects.push(shipState.ships[1]);
    if (spaceState.gameMode === "race") {
      importantObjects.push(goals[shipState.ships[1].nextGoal]);
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
