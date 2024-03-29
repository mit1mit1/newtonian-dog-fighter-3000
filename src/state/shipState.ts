// store.js
import {
  blastZoneCenterX,
  blastZoneCenterY,
  viewboxHeight,
  viewboxWidth,
} from "@/constants/mapNumbers";
import { frameMilliseconds, frameSpeedMultiplier } from "@/constants/physics";
import {
  baseShipMass,
  baseShipRadius,
  maxFuel,
  maxHealth,
} from "@/constants/ships";
import {
  getOutOfMapDamage,
  getPlanetDamage,
  getSquaredDistanceFromCenter,
  isWithinPercentOfBlastZone,
} from "@/utils/game";
import type { MoveableSphereData, NumberOfPlayers, Stage } from "@/types";
import { reactive } from "vue";
import { planets } from "./planetState";
import {
  getCollisionResult,
  gravityAccelerationX,
  gravityAccelerationY,
  resistanceAdjustedXSpeed,
  resistanceAdjustedYSpeed,
} from "@/utils/physics";
import { isOverlapping } from "@/utils/math";
import { adjustZoom, spaceState } from "./spaceState";
import { checkpoints } from "./checkpointState";
import { gameState } from "./gameState";
import { goals } from "./goalState";

const afterburnerFuelCost = 35;
const sideEngineFuelCost = 2;
const rearEngineFuelCost = 4;

type ShipStats = {
  radius: number;
  health: number;
  mass: number;
  rearEngineThrust: number;
  sideEngineThrust: number;
  fuel: number;
};

type ShipChangeableAttributes = {
  rearEngineOn: boolean;
  leftEngineOn: boolean;
  rightEngineOn: boolean;
  afterburnerOn: boolean;
  moveLag: boolean;
  angleRadians: number;
  angularMomentum: number;
  destroyed: boolean;
  nextCheckpoint: number;
  completedGoals: Array<number>;
  startFrame?: number;
};

export type ShipData = MoveableSphereData &
  ShipStats &
  ShipChangeableAttributes;

export const shipState = reactive({
  asteroids: [] as Array<MoveableSphereData>,
  ships: [] as Array<ShipData>,
  numberOfPlayers: 1 as NumberOfPlayers,
  enlargenShip(playerId: 0 | 1) {
    if (
      this.ships[playerId].radius === baseShipRadius &&
      !this.ships[playerId].moveLag
    ) {
      this.ships[playerId].radius += 5;
      this.ships[playerId].moveLag = true;
      setTimeout(() => this.unEnlargenShip(playerId), frameMilliseconds * 15);
      setTimeout(() => this.endMoveLag(playerId), frameMilliseconds * 30);
    }
  },
  unEnlargenShip(playerId: 0 | 1) {
    this.ships[playerId].radius -= 5;
  },
  hideShip(playerId: 0 | 1) {
    if (
      this.ships[playerId].radius === baseShipRadius &&
      !this.ships[playerId].moveLag
    ) {
      const originalRadius = this.ships[playerId].radius;
      this.ships[playerId].radius = 0;
      this.ships[playerId].moveLag = true;
      setTimeout(
        () => this.unHideShip(playerId, originalRadius),
        frameMilliseconds * 25
      );
      setTimeout(() => this.endMoveLag(playerId), frameMilliseconds * 40);
    }
  },
  unHideShip(playerId: 0 | 1, originalRadius: number) {
    const restoredShip = { ...this.ships[playerId], radius: originalRadius };
    let canUnHide = true;
    this.ships.forEach((ship, index) => {
      if (index != playerId) {
        if (isOverlapping(ship, restoredShip)) {
          canUnHide = false;
        }
      }
    });
    this.asteroids.forEach((asteriod) => {
      if (canUnHide) {
        if (isOverlapping(asteriod, restoredShip)) {
          canUnHide = false;
        }
      }
    });
    if (canUnHide) {
      this.ships[playerId].radius = originalRadius;
    } else {
      setTimeout(
        () => this.unHideShip(playerId, originalRadius),
        frameMilliseconds * 3
      );
    }
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
        frameMilliseconds * 50
      );
      setTimeout(() => this.endMoveLag(playerId), frameMilliseconds * 120);
    }
  },
  unFireAfterburner(playerId: 0 | 1) {
    this.ships[playerId].afterburnerOn = false;
  },
  endMoveLag(playerId: 0 | 1) {
    this.ships[playerId].moveLag = false;
  },
  pushExplosion(
    positionX: number,
    positionY: number,
    speedX: number,
    speedY: number
  ) {
    for (let i = -1; i < 2; i = i + 2) {
      for (let j = -1; j < 2; j = j + 2) {
        this.asteroids.push({
          positionX: positionX + i * 12,
          positionY: positionY + j * 12,
          speedX: speedX + i * 2.5,
          speedY: speedY + j * 2.5,
          radius: 4,
          mass: 2,
        });
      }
    }
  },
  moveForwardFrame() {
    gameState.frameNumber++;
    this.asteroids.forEach((asteroidData, index) => {
      this.ships.forEach((objectData, shipIndex) => {
        // TODO might need to assign differently here also would be nice to make the typing more generic
        [asteroidData, objectData] = (getCollisionResult(
          asteroidData,
          objectData
        ) as [MoveableSphereData, ShipData] | false) || [
          asteroidData,
          objectData as ShipData,
        ];
        shipState.asteroids[index] = asteroidData;
        shipState.ships[shipIndex] = objectData;
      });
      shipState.asteroids.forEach((nestedAsteroidData, nestedAsteroidIndex) => {
        if (nestedAsteroidIndex <= index) {
          return;
        }
        [asteroidData, nestedAsteroidData] = (getCollisionResult(
          asteroidData,
          nestedAsteroidData
        ) as [MoveableSphereData, MoveableSphereData] | false) || [
          asteroidData,
          nestedAsteroidData,
        ];
        shipState.asteroids[index] = asteroidData;
        shipState.asteroids[nestedAsteroidIndex] = nestedAsteroidData;
      });
      asteroidData.positionX =
        asteroidData.positionX + frameSpeedMultiplier * asteroidData.speedX;
      asteroidData.positionY =
        asteroidData.positionY + frameSpeedMultiplier * asteroidData.speedY;
      planets.forEach((planetData) => {
        asteroidData.speedX =
          asteroidData.speedX +
          frameSpeedMultiplier * gravityAccelerationX(planetData, asteroidData);
        asteroidData.speedY =
          asteroidData.speedY +
          frameSpeedMultiplier * gravityAccelerationY(planetData, asteroidData);
        asteroidData.speedX = resistanceAdjustedXSpeed(
          planetData,
          asteroidData
        );
        asteroidData.speedY = resistanceAdjustedYSpeed(
          planetData,
          asteroidData
        );
      });
    });
    if (shipState.ships.length > 1) {
      const [shipResult1, shipResult2] =
        (getCollisionResult(shipState.ships[0], shipState.ships[1]) as
          | [ShipData, ShipData]
          | false) || shipState.ships;
      shipState.ships[0] = shipResult1;
      shipState.ships[1] = shipResult2;
    }

    shipState.ships.forEach((shipData) => {
      if (shipData.destroyed) {
        return;
      }
      goals.forEach((goal, index) => {
        if (isOverlapping(shipData, goal)) {
          if (!shipData.startFrame) {
            shipData.startFrame = gameState.frameNumber;
          }
          if (!shipData.completedGoals.includes(index)) {
            shipData.completedGoals.push(index);
          }
        }
      });
      const nextCheckpoint = checkpoints[shipData.nextCheckpoint];
      if (nextCheckpoint && isOverlapping(shipData, nextCheckpoint)) {
        if (!shipData.startFrame) {
          shipData.startFrame = gameState.frameNumber;
        }
        shipData.nextCheckpoint++;
      }
      shipData.positionX =
        shipData.positionX + frameSpeedMultiplier * shipData.speedX;
      shipData.positionY =
        shipData.positionY + frameSpeedMultiplier * shipData.speedY;
      if (spaceState.gameMode === "battle") {
        shipData.health =
          shipData.health - frameSpeedMultiplier * getOutOfMapDamage(shipData);
      }
      planets.forEach((planetData) => {
        shipData.health =
          shipData.health -
          frameSpeedMultiplier * getPlanetDamage(shipData, planetData);
        shipData.speedX =
          shipData.speedX +
          frameSpeedMultiplier * gravityAccelerationX(planetData, shipData);
        shipData.speedY =
          shipData.speedY +
          frameSpeedMultiplier * gravityAccelerationY(planetData, shipData);
        shipData.speedX = resistanceAdjustedXSpeed(planetData, shipData);
        shipData.speedY = resistanceAdjustedYSpeed(planetData, shipData);
      });

      shipData.angleRadians = shipData.angleRadians + shipData.angularMomentum;
      shipData.angularMomentum *= 0.985 ** 4;
      if (shipData.leftEngineOn && shipData.fuel > 0) {
        shipData.fuel =
          shipData.fuel - frameSpeedMultiplier * sideEngineFuelCost;
        shipData.angularMomentum +=
          frameSpeedMultiplier * shipData.sideEngineThrust;
      }
      if (shipData.rightEngineOn && shipData.fuel > 0) {
        shipData.fuel =
          shipData.fuel - frameSpeedMultiplier * sideEngineFuelCost;
        shipData.angularMomentum -=
          frameSpeedMultiplier * shipData.sideEngineThrust;
      }
      if (shipData.rearEngineOn && shipData.fuel > 0) {
        shipData.fuel =
          shipData.fuel - frameSpeedMultiplier * rearEngineFuelCost;
        shipData.speedX =
          shipData.speedX +
          frameSpeedMultiplier *
            shipData.rearEngineThrust *
            Math.cos(shipData.angleRadians);
        shipData.speedY =
          shipData.speedY +
          frameSpeedMultiplier *
            shipData.rearEngineThrust *
            Math.sin(shipData.angleRadians);
      }
      if (shipData.afterburnerOn && shipData.fuel > 0) {
        shipData.fuel =
          shipData.fuel - frameSpeedMultiplier * afterburnerFuelCost;
        shipData.speedX =
          shipData.speedX +
          frameSpeedMultiplier *
            shipData.rearEngineThrust *
            2.5 *
            Math.cos(shipData.angleRadians);
        shipData.speedY =
          shipData.speedY +
          frameSpeedMultiplier *
            shipData.rearEngineThrust *
            2.5 *
            Math.sin(shipData.angleRadians);
      }
      if (shipData.fuel < maxFuel) {
        shipData.fuel =
          shipData.fuel +
          frameSpeedMultiplier * (spaceState.gameMode === "race" ? 3 : 1);
      }
      if (shipData.health < 0) {
        shipState.pushExplosion(
          shipData.positionX,
          shipData.positionY,
          shipData.speedX,
          shipData.speedY
        );
        shipData.destroyed = true;
      }
      // TODO - calculate the changed state, then push it at predictable times?
    });
    adjustZoom();
  },
});

const shipAtOrigin: MoveableSphereData = {
  positionX: 0,
  positionY: 0,
  speedX: 0,
  speedY: 0,
  mass: baseShipMass,
  radius: baseShipRadius,
};

const getParkedShip = (): ShipChangeableAttributes => ({
  rearEngineOn: false,
  leftEngineOn: false,
  rightEngineOn: false,
  afterburnerOn: false,
  angleRadians: 0,
  angularMomentum: 0,
  moveLag: false,
  destroyed: false,
  nextCheckpoint: 0,
  completedGoals: [],
});

const legacyShip: ShipStats = {
  radius: baseShipRadius,
  rearEngineThrust: 0.0018,
  sideEngineThrust: 0.0005,
  mass: baseShipMass,
  fuel: maxFuel,
  health: maxHealth,
};

const speederShip: ShipStats = {
  radius: baseShipRadius * 0.75,
  rearEngineThrust: 0.0018 * 1.5,
  sideEngineThrust: 0.0005 * 1.5,
  mass: baseShipMass / 2,
  fuel: maxFuel,
  health: maxHealth,
};

const bulkyShip: ShipStats = {
  radius: baseShipRadius * 1.25,
  rearEngineThrust: 0.0018 * 0.75,
  sideEngineThrust: 0.0005 * 0.95,
  mass: baseShipMass * 2,
  fuel: maxFuel * 1.25,
  health: maxHealth,
};

export const setShipData = (stage: Stage) => {
  gameState.stage = stage;
  shipState.ships.splice(0, shipState.ships.length);
  const numberOfPlayers = shipState.numberOfPlayers;
  if (numberOfPlayers === 0) {
    return;
  }
  const ship1Data = { ...shipAtOrigin, ...bulkyShip, ...getParkedShip() };

  const ship2Data = { ...shipAtOrigin, ...bulkyShip, ...getParkedShip() };

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
  if (numberOfPlayers >= 1) {
    shipState.ships.push(ship1Data);
  }
  if (numberOfPlayers >= 2) {
    shipState.ships.push(ship2Data);
  }
};

export const applyAI = (playerId: 0 | 1) => {
  const shipData = shipState.ships[playerId];
  const noThrustTestPosition = {
    positionX: shipData.positionX + frameSpeedMultiplier * 3 * shipData.speedX,
    positionY: shipData.positionY + frameSpeedMultiplier * 3 * shipData.speedY,
  };
  const forwardThrustTestPosition = {
    positionX:
      noThrustTestPosition.positionX +
      baseShipRadius * Math.cos(shipData.angleRadians),
    positionY:
      noThrustTestPosition.positionY +
      baseShipRadius * Math.sin(shipData.angleRadians),
  };
  const currentD2C = getSquaredDistanceFromCenter(shipData);
  const noThrustD2C = getSquaredDistanceFromCenter(noThrustTestPosition);
  const forwardThrustD2C = getSquaredDistanceFromCenter(
    forwardThrustTestPosition
  );
  if (isWithinPercentOfBlastZone(shipData, 63 / 100)) {
    if (noThrustD2C > currentD2C && noThrustD2C > forwardThrustD2C) {
      shipState.ships[playerId].rearEngineOn = true;
    } else if (
      noThrustD2C > forwardThrustD2C &&
      isWithinPercentOfBlastZone(shipData, 80 / 100)
    ) {
      shipState.ships[playerId].rearEngineOn = true;
    } else {
      shipState.ships[playerId].rearEngineOn = false;
    }
  }
  if (isWithinPercentOfBlastZone(shipData, 40 / 100)) {
    let idealAngle = Math.atan2(
      shipData.positionY - blastZoneCenterY,
      shipData.positionX - blastZoneCenterX
    );
    let shipAngle = shipData.angleRadians % (2 * Math.PI);
    if (shipAngle < 0) {
      shipAngle += 2 * Math.PI;
    }
    if (idealAngle < 0) {
      idealAngle += 2 * Math.PI;
    }
    let difference = (shipAngle - idealAngle) % (2 * Math.PI);
    if (difference > Math.PI) {
      difference -= 2 * Math.PI;
    }
    if (difference < -Math.PI) {
      difference += 2 * Math.PI;
    }
    let differenceMagnitude = Math.abs(difference % Math.PI);
    if (differenceMagnitude > Math.PI / 2) {
      differenceMagnitude -= Math.PI;
      differenceMagnitude = Math.abs(differenceMagnitude);
    }

    if (difference > 0 && differenceMagnitude > Math.PI / 8) {
      shipState.ships[playerId].leftEngineOn = true;
      shipState.ships[playerId].rightEngineOn = false;
    } else if (difference < 0 && differenceMagnitude > Math.PI / 8) {
      shipState.ships[playerId].leftEngineOn = false;
      shipState.ships[playerId].rightEngineOn = true;
    } else {
      shipState.ships[playerId].leftEngineOn = false;
      shipState.ships[playerId].rightEngineOn = false;
    }
  } else {
    shipState.ships[playerId].leftEngineOn = false;
    shipState.ships[playerId].rightEngineOn = false;
  }
};
