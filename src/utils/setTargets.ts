import { baseGoalRadius } from "@/constants/goals";
import { goals } from "@/state/goalState";
import type { Stage } from "@/types";
import { getTargetAroundPoint } from "./game";
import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";
import { checkpoints } from "@/state/checkpointState";

const middleGoal = getTargetAroundPoint(0, 0);

const middleCheckpoint = getTargetAroundPoint(0, 0);
const leftCheckpoint = getTargetAroundPoint(0.9 * viewboxHeight, 0);
const topCheckpoint = getTargetAroundPoint(0.9 * viewboxHeight, Math.PI / 2);
const rightCheckpoint = getTargetAroundPoint(0.9 * viewboxHeight, Math.PI);
const bottomCheckpoint = getTargetAroundPoint(
  0.9 * viewboxHeight,
  (Math.PI * 3) / 2
);

const pushStandardCircleCheckpoints = () => {
  checkpoints.push(
    topCheckpoint,
    rightCheckpoint,
    bottomCheckpoint,
    leftCheckpoint,
    middleCheckpoint
  );
};

export const setTargets = (stage: Stage, isRace?: boolean) => {
  checkpoints.splice(0, checkpoints.length);
  goals.splice(0, goals.length);

  if (!isRace) {
    return;
  }
  if (stage === "battlefield") {
    goals.push(
      getTargetAroundPoint(1.5 * viewboxHeight, (Math.PI * 3) / 2),
      getTargetAroundPoint(1.5 * viewboxHeight, Math.PI),
      getTargetAroundPoint(1.5 * viewboxHeight, Math.PI / 2),
      getTargetAroundPoint(1.5 * viewboxHeight, 0),
      getTargetAroundPoint(0, 0)
    );
  } else if (stage === "finalDestination" || stage === "newtonsCanons") {
    pushStandardCircleCheckpoints();
  } else if (stage === "pokemonStadium") {
    pushStandardCircleCheckpoints();
  } else if (stage === "milkyWay") {
    pushStandardCircleCheckpoints();
  } else if (stage === "maw") {
    pushStandardCircleCheckpoints();
  } else if (stage === "kongoFalls") {
    pushStandardCircleCheckpoints();
  } else if (stage === "junkyard") {
    pushStandardCircleCheckpoints();
  } else if (stage === "pinball") {
    pushStandardCircleCheckpoints();
  } else if (stage === "raceCourseOne") {
    checkpoints.push(
      middleCheckpoint,
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
  } else if (stage === "blender") {
    goals.push(
      getTargetAroundPoint(1.5 * viewboxHeight, (Math.PI * 3) / 2),
      getTargetAroundPoint(1.5 * viewboxHeight, Math.PI),
      getTargetAroundPoint(1.5 * viewboxHeight, Math.PI / 2),
      getTargetAroundPoint(1.5 * viewboxHeight, 0),
      getTargetAroundPoint(0, 0)
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
  }
};
