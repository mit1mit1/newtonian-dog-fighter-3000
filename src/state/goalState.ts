import type { GoalData, Stage } from "@/types";
import { reactive } from "vue";
import { baseGoalRadius } from "@/constants/goals";
import { getGoalAroundPoint } from "@/utils/game";

export const goals = reactive([] as Array<GoalData>);

const middleGoal = getGoalAroundPoint(0, 0);

export const setGoalData = (stage: Stage, isRace?: boolean) => {
  goals.splice(0, goals.length);
  if (!isRace) {
    return;
  }
  if (stage === "sol") {
    goals.push(
      {
        positionX: 200,
        positionY: 300,
        radius: baseGoalRadius,
      },
      {
        positionX: 700,
        positionY: 800,
        radius: baseGoalRadius,
      },
      {
        positionX: 1800,
        positionY: 600,
        radius: baseGoalRadius,
      },
      {
        positionX: 2100,
        positionY: -200,
        radius: baseGoalRadius,
      },
      {
        positionX: 1800,
        positionY: 1800,
        radius: baseGoalRadius,
      },
      {
        positionX: 1500,
        positionY: -800,
        radius: baseGoalRadius,
      },
      {
        positionX: -900,
        positionY: 700,
        radius: baseGoalRadius,
      },
      {
        positionX: 300,
        positionY: 300,
        radius: baseGoalRadius,
      },
      middleGoal
    );
  }
};
