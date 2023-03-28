// store.js
import type { NumberOfPlayers } from "@/types";
import { reactive } from "vue";

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
  setZoom: (n: number) => void;
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
  },
});
