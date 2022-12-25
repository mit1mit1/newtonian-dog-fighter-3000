export type Stage =
  | "battlefield"
  | "finalDestination"
  | "pokemonStadium"
  | "milkyWay"
  | "maw"
  | "kongoFalls"
  | "freefall"
  | "junkyard"
  | "pinball";

export type MoveableSphereData = {
  positionX: number;
  positionY: number;
  speedX: number;
  speedY: number;
  radius: number;
};
