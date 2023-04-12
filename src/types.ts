export type Stage =
  | "battlefield"
  | "finalDestination"
  | "pokemonStadium"
  | "milkyWay"
  | "maw"
  | "kongoFalls"
  | "freefall"
  | "junkyard"
  | "pinball"
  | "newtonsCanons"
  | "raceCourseOne"
  | "sol"
  | "blender";

export type MoveableSphereData = {
  positionX: number;
  positionY: number;
  speedX: number;
  speedY: number;
  radius: number;
  mass: number;
};

export type NumberOfPlayers = 0 | 1 | 2;

export type PlanetData = {
  positionX: number;
  positionY: number;
  radius: number;
  mass: number;
  resistanceMultiplier: number;
  damage: number;
  getNextPlanetData?: (
    frameNumber: number,
    currentPlanetData: PlanetData
  ) => PlanetData;
};

export type GoalData = {
  positionX: number;
  positionY: number;
  radius: number;
};