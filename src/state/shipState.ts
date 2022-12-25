// store.js
import { baseShipRadius, maxHealth } from "@/constants/ships";
import type { MoveableSphereData, Stage } from "@/types";
import { reactive } from "vue";

type ShipData = MoveableSphereData & {
  rearEngineOn: boolean;
  leftEngineOn: boolean;
  rightEngineOn: boolean;
  afterburnerOn: boolean;
  angleRadians: number;
  angularMomentum: number;
  health: number;
  rearEngineThrust: number;
  sideEngineThrust: number;
  moveLag: boolean;
};

const initialShip1Data: ShipData = {
  positionX: 1,
  positionY: 1,
  speedX: 1,
  speedY: 1,
  radius: 1,
  rearEngineOn: false,
  leftEngineOn: false,
  rightEngineOn: false,
  afterburnerOn: false,
  angleRadians: 1,
  angularMomentum: 1,
  health: 1,
  rearEngineThrust: 1,
  sideEngineThrust: 1,
  moveLag: false,
};

export const ship1Data = reactive(initialShip1Data);

const initialShip2Data: ShipData = {
  positionX: 1,
  positionY: 1,
  speedX: 1,
  speedY: 1,
  radius: 1,
  rearEngineOn: false,
  leftEngineOn: false,
  rightEngineOn: false,
  afterburnerOn: false,
  angleRadians: 1,
  angularMomentum: 1,
  health: 1,
  rearEngineThrust: 1,
  sideEngineThrust: 1,
  moveLag: false,
};

export const ship2Data = reactive(initialShip2Data);

export const setShipData = (stage: Stage) => {
  ship1Data.rearEngineOn = false;
  ship1Data.leftEngineOn = false;
  ship1Data.rightEngineOn = false;
  ship1Data.afterburnerOn = false;
  ship1Data.rearEngineThrust = 0.0018;
  ship1Data.sideEngineThrust = 0.0007;
  ship1Data.health = maxHealth;
  ship1Data.moveLag = false;
  ship1Data.radius = baseShipRadius;
  ship1Data.angularMomentum = 0;

  ship2Data.rearEngineOn = false;
  ship2Data.leftEngineOn = false;
  ship2Data.rightEngineOn = false;
  ship2Data.afterburnerOn = false;
  ship2Data.rearEngineThrust = 0.0018;
  ship2Data.sideEngineThrust = 0.0007;
  ship2Data.health = maxHealth;
  ship2Data.moveLag = false;
  ship2Data.radius = baseShipRadius;
  ship2Data.angularMomentum = 0;

  if (stage === "maw") {
    ship1Data.positionX = 550;
    ship1Data.positionY = 100;
    ship1Data.speedX = 0.45;
    ship1Data.speedY = 0.001;
    ship1Data.angleRadians = 0;

    ship2Data.positionX = 550;
    ship2Data.positionY = 440;
    ship2Data.speedX = -0.45;
    ship2Data.speedY = -0.001;
    ship2Data.angleRadians = 0;
  } else if (stage === "kongoFalls") {
    ship1Data.positionX = 550;
    ship1Data.positionY = 100;
    ship1Data.speedX = 0.45;
    ship1Data.speedY = 0.001;
    ship1Data.angleRadians = 0;

    ship2Data.positionX = 550;
    ship2Data.positionY = 440;
    ship2Data.speedX = 0.45;
    ship2Data.speedY = 0.001;
    ship2Data.angleRadians = 0;
  } else if (stage === "freefall" || stage === "pinball") {
    ship1Data.positionX = 550;
    ship1Data.positionY = 100;
    ship1Data.speedX = 0.001;
    ship1Data.speedY = 0.001;
    ship1Data.angleRadians = 0;

    ship2Data.positionX = 550;
    ship2Data.positionY = 440;
    ship2Data.speedX = 0.001;
    ship2Data.speedY = 0.001;
    ship2Data.angleRadians = 0;
  } else {
    ship1Data.positionX = 550;
    ship1Data.positionY = 100;
    ship1Data.speedX = 0.4;
    ship1Data.speedY = 0.001;
    ship1Data.angleRadians = 0;

    ship2Data.positionX = 550;
    ship2Data.positionY = 440;
    ship2Data.speedX = -0.4;
    ship2Data.speedY = -0.001;
    ship2Data.angleRadians = 0;
  }
};
