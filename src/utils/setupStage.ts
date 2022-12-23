import { setPlanetData } from "@/state/planetState";
import { setShipData } from "@/state/shipState";
import type { Stage } from "@/types";

export const setupStage = (stage: Stage | "random") => {
  if (stage === "random") {
    const random = Math.random();
    if (random < 0.33) {
      stage = "battlefield";
    } else if (random < 0.66) {
      stage = "finalDestination";
    } else {
      stage = "pokemonStadium";
    }
  }
  setShipData(stage);
  setPlanetData(stage);
};
