import { baseGoalRadius } from "@/constants/goals";
import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";
import type { GoalData, Stage } from "@/types";
import { getGoalAroundPoint } from "@/utils/game";
import { reactive } from "vue";

export const checkpoints = reactive([] as Array<GoalData>);

const middleCheckpoint = getGoalAroundPoint(0, 0);
const leftCheckpoint = getGoalAroundPoint(0.9 * viewboxHeight, 0);
const topCheckpoint = getGoalAroundPoint(0.9 * viewboxHeight, Math.PI / 2);
const rightCheckpoint = getGoalAroundPoint(0.9 * viewboxHeight, Math.PI);
const bottomCheckpoint = getGoalAroundPoint(
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

export const setCheckpointData = (stage: Stage, isRace?: boolean) => {
  checkpoints.splice(0, checkpoints.length);
  if (!isRace) {
    return;
  }
  if (stage === "battlefield") {
    pushStandardCircleCheckpoints();
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
  }else if (stage === "blender") {
    checkpoints.push(
      getGoalAroundPoint(1.5 * viewboxHeight, (Math.PI * 3) / 2),
      getGoalAroundPoint(1.5 * viewboxHeight, Math.PI),
      getGoalAroundPoint(1.5 * viewboxHeight, Math.PI / 2),
      getGoalAroundPoint(1.5 * viewboxHeight, 0),
      getGoalAroundPoint(0, 0)
    );
  }
};
