<script lang="ts">
import { blastZoneCenterX, blastZoneCenterY, blastZoneRadiusX, blastZoneRadiusY } from "@/constants/mapNumbers.js";
import { planets } from "@/state/planetState";
import { baseShipRadius, maxHealth } from "@/constants/ships";
import { ship1Data, ship2Data } from "@/state/shipState";
import { spaceState } from "@/state/spaceState";
import { distanceSquared } from "@/utils/math";
import { applyCollisionSpeedChange, applyCollisionPositionFix, gravityAccelerationX, gravityAccelerationY, resistanceAdjustmentX, resistanceAdjustmentY } from "@/utils/physics";
import { defineComponent } from "vue";
import { setupStage } from "@/utils/setupStage";
import { frameMilliseconds } from "@/constants/physics";
import { asteroids } from "@/state/asteroidState";

let isRestarting = false;
let hasSetIsRestarting = false;

const enlargen = (shipData: { radius: number, moveLag: boolean }) => {
    if (shipData.radius === baseShipRadius && !shipData.moveLag) {
        shipData.radius += 5;
        shipData.moveLag = true;
        setTimeout(() => shipData.radius -= 5, frameMilliseconds * 60)
        setTimeout(() => shipData.moveLag = false, frameMilliseconds * 110)
    }
}

const hide = (shipData: { radius: number, moveLag: boolean }) => {
    if (shipData.radius === baseShipRadius && !shipData.moveLag) {
        shipData.radius = 0;
        shipData.moveLag = true;
        setTimeout(() => shipData.radius = baseShipRadius, frameMilliseconds * 100)
        setTimeout(() => shipData.moveLag = false, frameMilliseconds * 150)
    }
}

const fireAfterburner = (shipData: { afterburnerOn: boolean, moveLag: boolean }) => {
    if (shipData.afterburnerOn === false && !shipData.moveLag) {
        shipData.afterburnerOn = true;
        shipData.moveLag = true;
        setTimeout(() => shipData.afterburnerOn = false, frameMilliseconds * 200)
        setTimeout(() => shipData.moveLag = false, frameMilliseconds * 450)
    }
}

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "d") {
        ship1Data.leftEngineOn = true;
    }
    if (e.key === "a") {
        ship1Data.rightEngineOn = true;
    }
    if (e.key === "w") {
        ship1Data.rearEngineOn = true;
    }
    if (e.key === "q") {
        enlargen(ship1Data);
    }
    if (e.key === "e") {
        hide(ship1Data);
    }
    if (e.key === "s") {
        fireAfterburner(ship1Data);
    }
    if (e.key === "l") {
        ship2Data.leftEngineOn = true;
    }
    if (e.key === "j") {
        ship2Data.rightEngineOn = true;
    }
    if (e.key === "i") {
        ship2Data.rearEngineOn = true;
    }
    if (e.key === "u") {
        enlargen(ship2Data);
    }
    if (e.key === "o") {
        hide(ship2Data);
    }
    if (e.key === "k") {
        fireAfterburner(ship2Data);
    }
}

const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === "d") {
        ship1Data.leftEngineOn = false;
    }
    if (e.key === "a") {
        ship1Data.rightEngineOn = false;
    }
    if (e.key === "w") {
        ship1Data.rearEngineOn = false;
    }
    if (e.key === "l") {
        ship2Data.leftEngineOn = false;
    }
    if (e.key === "j") {
        ship2Data.rightEngineOn = false;
    }
    if (e.key === "i") {
        ship2Data.rearEngineOn = false;
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
            [ship1Data, ship2Data].forEach((objectData) => {
                applyCollisionSpeedChange(asteroidData, objectData);
                applyCollisionPositionFix(asteroidData, objectData);
            });
            asteroids.forEach((nestedAsteroidData, nestAsteroidIndex) => {
                if (nestAsteroidIndex === index) {
                    return;
                }
                applyCollisionSpeedChange(asteroidData, nestedAsteroidData);
                applyCollisionPositionFix(asteroidData, nestedAsteroidData);
            });
            asteroidData.positionX = asteroidData.positionX + asteroidData.speedX;
            asteroidData.positionY = asteroidData.positionY + asteroidData.speedY;
            planets.forEach(planetData => {
                asteroidData.speedX = asteroidData.speedX + gravityAccelerationX(planetData, asteroidData);
                asteroidData.speedY = asteroidData.speedY + gravityAccelerationY(planetData, asteroidData);
                asteroidData.speedX = resistanceAdjustmentX(planetData, asteroidData);
                asteroidData.speedY = resistanceAdjustmentY(planetData, asteroidData);
            });
        });

        applyCollisionSpeedChange(ship1Data, ship2Data);
        applyCollisionPositionFix(ship1Data, ship2Data);
        [ship1Data, ship2Data].forEach(shipData => {
            shipData.positionX = shipData.positionX + shipData.speedX;
            shipData.positionY = shipData.positionY + shipData.speedY;
            shipData.health = shipData.health - getOutOfMapDamage(shipData);
            planets.forEach(planetData => {
                shipData.health = shipData.health - getPlanetDamage(shipData, planetData);
                shipData.speedX = shipData.speedX + gravityAccelerationX(planetData, shipData);
                shipData.speedY = shipData.speedY + gravityAccelerationY(planetData, shipData);
                shipData.speedX = resistanceAdjustmentX(planetData, shipData);
                shipData.speedY = resistanceAdjustmentY(planetData, shipData);
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
            ship1Data, ship2Data, pi: Math.PI, maxHealth
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
    <rect v-if="ship1Data.health >= 0" class="healthBar" x="50" y="500" :width="200 * ship1Data.health / maxHealth"
        height="20" rx="5" fill="url(#grad1)" />
    <rect v-if="ship2Data.health >= 0" class="healthBar" x="800" y="500" :width="200 * ship2Data.health / maxHealth"
        height="20" rx="5" fill="url(#grad2)" />
    <g v-if="ship1Data.health >= 0">
        <circle class="ship1" :cx="ship1Data.positionX" :cy="ship1Data.positionY" :r="ship1Data.radius"
            :transform="`rotate(${180 * ship1Data.angleRadians / pi}, ${ship1Data.positionX}, ${ship1Data.positionY})`"
            fill="url(#grad1)" />
        <circle v-if="ship1Data.rearEngineOn" class="ship1Burner" :cx="ship1Data.positionX - 2 * ship1Data.radius / 3"
            :cy="ship1Data.positionY" :r="ship1Data.radius / 2"
            :transform="`rotate(${180 * ship1Data.angleRadians / pi}, ${ship1Data.positionX}, ${ship1Data.positionY})`"
            fill="url(#grad2)" />
        <circle v-if="ship1Data.afterburnerOn" class="ship1Afterburner"
            :cx="ship1Data.positionX - 2 * ship1Data.radius / 3" :cy="ship1Data.positionY" :r="2 * ship1Data.radius / 3"
            :transform="`rotate(${180 * ship1Data.angleRadians / pi}, ${ship1Data.positionX}, ${ship1Data.positionY})`"
            fill="url(#grad2)" />
    </g>
    <text v-else x="80" y="500" font-family="monospace" stroke="url(#grad1)">
        Destroyed
    </text>
    <g v-if="ship2Data.health >= 0">
        <circle class="ship2" :cx="ship2Data.positionX" :cy="ship2Data.positionY" :r="ship2Data.radius"
            :transform="`rotate(${180 * ship2Data.angleRadians / pi}, ${ship2Data.positionX}, ${ship2Data.positionY})`"
            fill="url(#grad2)" />
        <circle v-if="ship2Data.rearEngineOn" class="ship2Burner" :cx="ship2Data.positionX - 2 * ship2Data.radius / 3"
            :cy="ship2Data.positionY" :r="ship2Data.radius / 2"
            :transform="`rotate(${180 * ship2Data.angleRadians / pi}, ${ship2Data.positionX}, ${ship2Data.positionY})`"
            fill="url(#grad1)" />
        <circle v-if="ship2Data.afterburnerOn" class="ship2Afterburner"
            :cx="ship2Data.positionX - 2 * ship2Data.radius / 3" :cy="ship2Data.positionY" :r="2 * ship2Data.radius / 3"
            :transform="`rotate(${180 * ship2Data.angleRadians / pi}, ${ship2Data.positionX}, ${ship2Data.positionY})`"
            fill="url(#grad1)" />
    </g>
    <text v-else x="830" y="500" font-family="monospace" stroke="url(#grad2)">
        Destroyed
    </text>
</template>