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
  | "raceCourseOne";

export type MoveableSphereData = {
  positionX: number;
  positionY: number;
  speedX: number;
  speedY: number;
  radius: number;
  mass: number;
};

export type NumberOfPlayers = 0 | 1 | 2;
