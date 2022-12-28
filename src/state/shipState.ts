// store.js
import { viewboxHeight, viewboxWidth } from "@/constants/mapNumbers";
import { frameMilliseconds } from "@/constants/physics";
import { baseShipMass, baseShipRadius, maxHealth } from "@/constants/ships";
import type { MoveableSphereData, Stage } from "@/types";
import { reactive } from "vue";

export type ShipData = MoveableSphereData & {
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

export const shipState = reactive({
  ships: [] as Array<ShipData>,
  enlargen(playerId: 0 | 1) {
    if (
      this.ships[playerId].radius === baseShipRadius &&
      !this.ships[playerId].moveLag
    ) {
      this.ships[playerId].radius += 5;
      this.ships[playerId].moveLag = true;
      setTimeout(() => this.unEnlargen(playerId), frameMilliseconds * 60);
      setTimeout(() => this.endMoveLag(playerId), frameMilliseconds * 110);
    }
  },
  unEnlargen(playerId: 0 | 1) {
    this.ships[playerId].radius -= 5;
  },
  hide(playerId: 0 | 1) {
    if (
      this.ships[playerId].radius === baseShipRadius &&
      !this.ships[playerId].moveLag
    ) {
      const originalRadius = this.ships[playerId].radius;
      this.ships[playerId].radius = 0;
      this.ships[playerId].moveLag = true;
      setTimeout(
        () => this.unHide(playerId, originalRadius),
        frameMilliseconds * 100
      );
      setTimeout(() => this.endMoveLag(playerId), frameMilliseconds * 150);
    }
  },
  unHide(playerId: 0 | 1, originalRadius: number) {
    this.ships[playerId].radius = originalRadius;
  },
  fireAfterburner(playerId: 0 | 1) {
    if (
      this.ships[playerId].afterburnerOn === false &&
      !this.ships[playerId].moveLag
    ) {
      this.ships[playerId].afterburnerOn = true;
      this.ships[playerId].moveLag = true;
      setTimeout(
        () => this.unFireAfterburner(playerId),
        frameMilliseconds * 200
      );
      setTimeout(() => this.endMoveLag(playerId), frameMilliseconds * 450);
    }
  },
  unFireAfterburner(playerId: 0 | 1) {
    this.ships[playerId].afterburnerOn = false;
  },
  endMoveLag(playerId: 0 | 1) {
    this.ships[playerId].moveLag = false;
  },
});

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
  mass: baseShipMass,
};

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
  mass: baseShipMass,
};

export const setShipData = (stage: Stage) => {
  shipState.ships.length = 0;
  const ship1Data = { ...initialShip1Data };
  ship1Data.rearEngineOn = false;
  ship1Data.leftEngineOn = false;
  ship1Data.rightEngineOn = false;
  ship1Data.afterburnerOn = false;
  ship1Data.rearEngineThrust = 0.0018;
  ship1Data.sideEngineThrust = 0.0005;
  ship1Data.health = maxHealth;
  ship1Data.moveLag = false;
  ship1Data.radius = baseShipRadius;
  ship1Data.angularMomentum = 0;

  const ship2Data = { ...initialShip2Data };
  ship2Data.rearEngineOn = false;
  ship2Data.leftEngineOn = false;
  ship2Data.rightEngineOn = false;
  ship2Data.afterburnerOn = false;
  ship2Data.rearEngineThrust = 0.0018;
  ship2Data.sideEngineThrust = 0.0005;
  ship2Data.health = maxHealth;
  ship2Data.moveLag = false;
  ship2Data.radius = baseShipRadius;
  ship2Data.angularMomentum = 0;

  if (stage === "maw") {
    ship1Data.positionX = viewboxWidth * 0.5;
    ship1Data.positionY = viewboxHeight * 0.5 - 170;
    ship1Data.speedX = 0.45;
    ship1Data.speedY = 0;
    ship1Data.angleRadians = 0;

    ship2Data.positionX = viewboxWidth * 0.5;
    ship2Data.positionY = viewboxHeight * 0.5 + 170;
    ship2Data.speedX = -0.45;
    ship2Data.speedY = 0;
    ship2Data.angleRadians = Math.PI;
  } else if (stage === "kongoFalls") {
    ship1Data.positionX = viewboxWidth * 0.5;
    ship1Data.positionY = viewboxHeight * 0.5 - 170;
    ship1Data.speedX = 0.45;
    ship1Data.speedY = 0;
    ship1Data.angleRadians = 0;

    ship2Data.positionX = viewboxWidth * 0.5;
    ship2Data.positionY = viewboxHeight * 0.5 + 170;
    ship2Data.speedX = 0.45;
    ship2Data.speedY = 0;
    ship2Data.angleRadians = 0;
  } else if (stage === "freefall" || stage === "pinball") {
    ship1Data.positionX = viewboxWidth * 0.5;
    ship1Data.positionY = viewboxHeight * 0.5 - 170;
    ship1Data.speedX = 0;
    ship1Data.speedY = 0;
    ship1Data.angleRadians = 0;

    ship2Data.positionX = viewboxWidth * 0.5;
    ship2Data.positionY = viewboxHeight * 0.5 + 170;
    ship2Data.speedX = 0;
    ship2Data.speedY = 0;
    ship2Data.angleRadians = Math.PI;
  } else {
    ship1Data.positionX = viewboxWidth * 0.5;
    ship1Data.positionY = viewboxHeight * 0.5 - 170;
    ship1Data.speedX = 0.4;
    ship1Data.speedY = 0;
    ship1Data.angleRadians = 0;

    ship2Data.positionX = viewboxWidth * 0.5;
    ship2Data.positionY = viewboxHeight * 0.5 + 170;
    ship2Data.speedX = -0.4;
    ship2Data.speedY = 0;
    ship2Data.angleRadians = Math.PI;
  }
  // TODO: Move this to function on state
  shipState.ships.push(ship1Data);
  shipState.ships.push(ship2Data);
};