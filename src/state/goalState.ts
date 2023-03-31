import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";
import type { Stage } from "@/types";
import { reactive } from "vue";

type GoalData = {
  positionX: number;
  positionY: number;
  radius: number;
};
export const baseGoalRadius = 25;

export const goals = reactive([] as Array<GoalData>);

const middleGoal = {
  positionX: 0.5 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: baseGoalRadius,
};
const leftGoal = {
  positionX: 0 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: baseGoalRadius,
};
const topGoal = {
  positionX: 0.5 * viewboxWidth,
  positionY: 0 * viewboxHeight,
  radius: baseGoalRadius,
};
const rightGoal = {
  positionX: 1 * viewboxWidth,
  positionY: 0.5 * viewboxHeight,
  radius: baseGoalRadius,
};
const bottomGoal = {
  positionX: 0.5 * viewboxWidth,
  positionY: 1 * viewboxHeight,
  radius: baseGoalRadius,
};

export const setGoalData = (stage: Stage, isRace?: boolean) => {
  goals.splice(0, goals.length);
  if (!isRace) {
    return;
  }
  if (stage === "battlefield") {
    goals.push(topGoal, rightGoal, bottomGoal, leftGoal, middleGoal);
  } else if (stage === "finalDestination" || stage === "newtonsCanons") {
    goals.push(topGoal, rightGoal, bottomGoal, leftGoal, middleGoal);
  } else if (stage === "pokemonStadium") {
    goals.push(topGoal, rightGoal, bottomGoal, leftGoal, middleGoal);
  } else if (stage === "milkyWay") {
    goals.push(topGoal, rightGoal, bottomGoal, leftGoal, middleGoal);
  } else if (stage === "maw") {
    goals.push(topGoal, rightGoal, bottomGoal, leftGoal, middleGoal);
  } else if (stage === "kongoFalls") {
    goals.push(topGoal, rightGoal, bottomGoal, leftGoal, middleGoal);
  } else if (stage === "junkyard") {
    goals.push(topGoal, rightGoal, bottomGoal, leftGoal, middleGoal);
  } else if (stage === "pinball") {
    goals.push(topGoal, rightGoal, bottomGoal, leftGoal, middleGoal);
  } else if (stage === "raceCourseOne") {
    goals.push(
      middleGoal,
      {
        positionX: 2.5 * viewboxWidth,
        positionY: 2.5 * viewboxHeight,
        radius: baseGoalRadius,
      },
      {
        positionX: 4.5 * viewboxWidth,
        positionY: 4.5 * viewboxHeight,
        radius: baseGoalRadius,
      }
    );
  } else if (stage === "sol") {
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
  }else if (stage === "blender") {
    goals.push(
      middleGoal,
      leftGoal,
      topGoal,
      rightGoal,
      bottomGoal,
    );
  }
};
