<script lang="ts">
import { blastZoneCenterX, blastZoneCenterY, blastZoneRadiusX, blastZoneRadiusY } from "@/constants/mapNumbers.js";
import { planets } from "@/state/planetState";
import { baseShipRadius, maxHealth } from "@/constants/ships";
import { shipState, type ShipData } from "@/state/shipState";
import { spaceState } from "@/state/spaceState";
import { distanceSquared } from "@/utils/math";
import { getCollisionResult, gravityAccelerationX, gravityAccelerationY, resistanceAdjustedXSpeed, resistanceAdjustedYSpeed } from "@/utils/physics";
import { defineComponent } from "vue";
import { setupStage } from "@/utils/setupStage";
import { frameMilliseconds } from "@/constants/physics";
import { asteroids } from "@/state/asteroidState";
import type { MoveableSphereData } from "@/types";

let isRestarting = false;
let hasSetIsRestarting = false;


const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "d") {
        shipState.ships[0].leftEngineOn = true;
    }
    if (e.key === "a") {
        shipState.ships[0].rightEngineOn = true;
    }
    if (e.key === "w") {
        shipState.ships[0].rearEngineOn = true;
    }
    if (e.key === "q") {
        shipState.enlargen(0);
    }
    if (e.key === "e") {
        shipState.hide(0);
    }
    if (e.key === "s") {
        shipState.fireAfterburner(0);
    }
    if (e.key === "l") {
        shipState.ships[1].leftEngineOn = true;
    }
    if (e.key === "j") {
        shipState.ships[1].rightEngineOn = true;
    }
    if (e.key === "i") {
        shipState.ships[1].rearEngineOn = true;
    }
    if (e.key === "u") {
        shipState.enlargen(1);
    }
    if (e.key === "o") {
        shipState.hide(1);
    }
    if (e.key === "k") {
        shipState.fireAfterburner(1);
    }
}

const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === "d") {
        shipState.ships[0].leftEngineOn = false;
    }
    if (e.key === "a") {
        shipState.ships[0].rightEngineOn = false;
    }
    if (e.key === "w") {
        shipState.ships[0].rearEngineOn = false;
    }
    if (e.key === "l") {
        shipState.ships[1].leftEngineOn = false;
    }
    if (e.key === "j") {
        shipState.ships[1].rightEngineOn = false;
    }
    if (e.key === "i") {
        shipState.ships[1].rearEngineOn = false;
    }
}

document.addEventListener("keydown", handleKeydown);
document.addEventListener("keyup", handleKeyup);



const getPlanetDamage = (shipData: { radius: number, positionX: number, positionY: number }, planetData: { positionX: number, positionY: number, radius: number, damage: number }) => {
    if (distanceSquared(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) < (shipData.radius + 2 + planetData.radius) ** 2) {
        return planetData.damage;
    }
    return 0;
}

const getOutOfMapDamage = (shipData: { positionX: number, positionY: number }) => {
    if (((shipData.positionX - blastZoneCenterX) / blastZoneRadiusX) ** 2 + ((shipData.positionY - blastZoneCenterY) / blastZoneRadiusY) ** 2 > 1) {
        return 10;
    }
    return 0;
}

const updateShipData = () => {
    if (!isRestarting && spaceState.isStarted) {

        asteroids.forEach((asteroidData, index) => {
            shipState.ships.forEach((objectData) => {
                // TODO might need to assign differently here also would be nice to make the typing more generic
                [asteroidData, objectData] = getCollisionResult(asteroidData, objectData) as [MoveableSphereData, ShipData] | false || [asteroidData, objectData as ShipData];
            });
            asteroids.forEach((nestedAsteroidData, nestAsteroidIndex) => {
                if (nestAsteroidIndex === index) {
                    return;
                }
                [asteroidData, nestedAsteroidData] = getCollisionResult(asteroidData, nestedAsteroidData) as [MoveableSphereData, MoveableSphereData] | false || [asteroidData, nestedAsteroidData];
            });
            asteroidData.positionX = asteroidData.positionX + asteroidData.speedX;
            asteroidData.positionY = asteroidData.positionY + asteroidData.speedY;
            planets.forEach(planetData => {
                asteroidData.speedX = asteroidData.speedX + gravityAccelerationX(planetData, asteroidData);
                asteroidData.speedY = asteroidData.speedY + gravityAccelerationY(planetData, asteroidData);
                asteroidData.speedX = resistanceAdjustedXSpeed(planetData, asteroidData);
                asteroidData.speedY = resistanceAdjustedYSpeed(planetData, asteroidData);
            });
        });

        // TODO: move ship data into array, correctly push to it at end of calculation with the rest
        const [ship1Result, ship2Result] = getCollisionResult(shipState.ships[0], shipState.ships[1]) as [ShipData, ShipData] | false || shipState.ships;
        shipState.ships[0] = ship1Result;
        shipState.ships[1] = ship2Result;

        shipState.ships.forEach(shipData => {
            shipData.positionX = shipData.positionX + shipData.speedX;
            shipData.positionY = shipData.positionY + shipData.speedY;
            shipData.health = shipData.health - getOutOfMapDamage(shipData);
            planets.forEach(planetData => {
                shipData.health = shipData.health - getPlanetDamage(shipData, planetData);
                shipData.speedX = shipData.speedX + gravityAccelerationX(planetData, shipData);
                shipData.speedY = shipData.speedY + gravityAccelerationY(planetData, shipData);
                shipData.speedX = resistanceAdjustedXSpeed(planetData, shipData);
                shipData.speedY = resistanceAdjustedYSpeed(planetData, shipData);
            });

            shipData.angleRadians = shipData.angleRadians + shipData.angularMomentum;
            shipData.angularMomentum *= 0.985
            if (shipData.leftEngineOn) {
                shipData.angularMomentum += shipData.sideEngineThrust
            }
            if (shipData.rightEngineOn) {
                shipData.angularMomentum -= shipData.sideEngineThrust
            }
            if (shipData.rearEngineOn) {
                shipData.speedX = shipData.speedX + shipData.rearEngineThrust * Math.cos(shipData.angleRadians);
                shipData.speedY = shipData.speedY + shipData.rearEngineThrust * Math.sin(shipData.angleRadians);
            }
            if (shipData.afterburnerOn) {
                shipData.speedX = shipData.speedX + shipData.rearEngineThrust * 2.5 * Math.cos(shipData.angleRadians);
                shipData.speedY = shipData.speedY + shipData.rearEngineThrust * 2.5 * Math.sin(shipData.angleRadians);
            }
            if (shipData.health <= 0 && isRestarting === false && hasSetIsRestarting === false) {
                hasSetIsRestarting = true;
                setTimeout(() => {
                    isRestarting = true
                }, 1000)
                setTimeout(() => setupStage("random"), 3000)
                setTimeout(() => {
                    isRestarting = false
                    hasSetIsRestarting = false
                }, 3000)
            }
        });
    }
}

let t = setInterval(updateShipData, frameMilliseconds);


export default defineComponent({
    data() {
        return {
            shipState, pi: Math.PI, maxHealth
        }
    },
});
</script>

<template>
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="50%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="50%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,0,255);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(0,255,255);stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect v-if="shipState.ships[0].health >= 0" class="healthBar" x="50" y="500"
        :width="200 * shipState.ships[0].health / maxHealth" height="20" rx="5" fill="url(#grad1)" />
    <rect v-if="shipState.ships[1].health >= 0" class="healthBar" x="800" y="500"
        :width="200 * shipState.ships[1].health / maxHealth" height="20" rx="5" fill="url(#grad2)" />
    <g v-if="shipState.ships[0].health >= 0">
        <circle class="ship1" :cx="shipState.ships[0].positionX" :cy="shipState.ships[0].positionY"
            :r="shipState.ships[0].radius"
            :transform="`rotate(${180 * shipState.ships[0].angleRadians / pi}, ${shipState.ships[0].positionX}, ${shipState.ships[0].positionY})`"
            fill="url(#grad1)" />
        <circle v-if="shipState.ships[0].rearEngineOn" class="ship1Burner"
            :cx="shipState.ships[0].positionX - 2 * shipState.ships[0].radius / 3" :cy="shipState.ships[0].positionY"
            :r="shipState.ships[0].radius / 2"
            :transform="`rotate(${180 * shipState.ships[0].angleRadians / pi}, ${shipState.ships[0].positionX}, ${shipState.ships[0].positionY})`"
            fill="url(#grad2)" />
        <circle v-if="shipState.ships[0].afterburnerOn" class="ship1Afterburner"
            :cx="shipState.ships[0].positionX - 2 * shipState.ships[0].radius / 3" :cy="shipState.ships[0].positionY"
            :r="2 * shipState.ships[0].radius / 3"
            :transform="`rotate(${180 * shipState.ships[0].angleRadians / pi}, ${shipState.ships[0].positionX}, ${shipState.ships[0].positionY})`"
            fill="url(#grad2)" />
    </g>
    <text v-else x="80" y="500" font-family="monospace" stroke="url(#grad1)">
        Destroyed
    </text>
    <g v-if="shipState.ships[1].health >= 0">
        <circle class="ship2" :cx="shipState.ships[1].positionX" :cy="shipState.ships[1].positionY"
            :r="shipState.ships[1].radius"
            :transform="`rotate(${180 * shipState.ships[1].angleRadians / pi}, ${shipState.ships[1].positionX}, ${shipState.ships[1].positionY})`"
            fill="url(#grad2)" />
        <circle v-if="shipState.ships[1].rearEngineOn" class="ship2Burner"
            :cx="shipState.ships[1].positionX - 2 * shipState.ships[1].radius / 3" :cy="shipState.ships[1].positionY"
            :r="shipState.ships[1].radius / 2"
            :transform="`rotate(${180 * shipState.ships[1].angleRadians / pi}, ${shipState.ships[1].positionX}, ${shipState.ships[1].positionY})`"
            fill="url(#grad1)" />
        <circle v-if="shipState.ships[1].afterburnerOn" class="ship2Afterburner"
            :cx="shipState.ships[1].positionX - 2 * shipState.ships[1].radius / 3" :cy="shipState.ships[1].positionY"
            :r="2 * shipState.ships[1].radius / 3"
            :transform="`rotate(${180 * shipState.ships[1].angleRadians / pi}, ${shipState.ships[1].positionX}, ${shipState.ships[1].positionY})`"
            fill="url(#grad1)" />
    </g>
    <text v-else x="830" y="500" font-family="monospace" stroke="url(#grad2)">
        Destroyed
    </text>
</template>