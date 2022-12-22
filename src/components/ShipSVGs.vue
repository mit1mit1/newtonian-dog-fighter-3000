<script lang="ts">
import { blastZoneCenterX, blastZoneCenterY, blastZoneRadiusX, blastZoneRadiusY } from "@/constants/mapNumbers.js";
import { planets } from "@/constants/planets";
import { distanceSquared } from "@/utils/math";
import { collisionFixX, collisionFixY, gravityAccelerationX, gravityAccelerationY, resistanceAdjustmentX, resistanceAdjustmentY } from "@/utils/physics";
import { defineComponent, reactive } from "vue";

const frameMilliseconds = 2;
const maxHealth = 5000;

const baseShipRadius = 7;

let isRestarting = false;

type ShipData = {
    positionX: number,
    positionY: number,
    speedX: number,
    speedY: number,
    radius: number,
    rearEngineOn: boolean,
    leftEngineOn: boolean,
    rightEngineOn: boolean,
    afterburnerOn: boolean,
    angleRadians: number,
    angularMomentum: number,
    health: number,
    rearEngineThrust: number,
    sideEngineThrust: number,
    moveLag: boolean,
}

const initialShip1Data: ShipData = {
    positionX: 550,
    positionY: 100,
    speedX: 0.4,
    speedY: 0.001,
    radius: baseShipRadius,
    rearEngineOn: false,
    leftEngineOn: false,
    rightEngineOn: false,
    afterburnerOn: false,
    angleRadians: 0,
    angularMomentum: 0,
    health: maxHealth,
    rearEngineThrust: 0.0018,
    sideEngineThrust: 0.0007,
    moveLag: false,
};

let ship1Data = reactive(initialShip1Data);

const initialShip2Data: ShipData = {
    positionX: 550,
    positionY: 440,
    speedX: -0.4,
    speedY: -0.001,
    radius: baseShipRadius,
    rearEngineOn: false,
    leftEngineOn: false,
    rightEngineOn: false,
    afterburnerOn: false,
    angleRadians: 0,
    angularMomentum: 0,
    health: maxHealth,
    rearEngineThrust: 0.0018,
    sideEngineThrust: 0.0007,
    moveLag: false,
}

let ship2Data = reactive(initialShip2Data);

// const resetShipData = () => {
//     console.log('resetting')
//     for (const property in initialShip1Data) {
//         console.log(property);
//         ship1Data[property as any] = initialShip1Data[property as keyof ShipData];
//     }
//     for (const property in initialShip2Data) {
//         ship2Data[property as any] = initialShip2Data[property as keyof ShipData];
//     }
// }

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



const getPlanetDamage = (shipData: { radius: number, positionX: number, positionY: number }, planetData: { positionX: number, positionY: number, radius: number }) => {
    if (distanceSquared(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) < (shipData.radius + 2 + planetData.radius) ** 2) {
        return 1;
    }
    return 0;
}

const getOutOfMapDamage = (shipData: { positionX: number, positionY: number }) => {
    if (((shipData.positionX - blastZoneCenterX) / blastZoneRadiusX) ** 2 + ((shipData.positionY - blastZoneCenterY) / blastZoneRadiusY) ** 2 > 1) {
        return 10;
    }
    return 0;
}

const applyCollisionSpeedChange = (firstShipData: { speedX: number, speedY: number, positionX: number, positionY: number, radius: number }, secondShipData: { speedX: number, speedY: number, positionX: number, positionY: number, radius: number }) => {
    if (distanceSquared(firstShipData.positionX, secondShipData.positionX, firstShipData.positionY, secondShipData.positionY) > (firstShipData.radius + secondShipData.radius) ** 2) {
        return;
    }
    const firstSpeedX = firstShipData.speedX;
    const secondSpeedX = secondShipData.speedX;
    const firstSpeedY = firstShipData.speedY;
    const secondSpeedY = secondShipData.speedY;
    firstShipData.speedX = 0.2 * firstSpeedX + 0.85 * secondSpeedX
    firstShipData.speedY = 0.2 * firstSpeedY + 0.85 * secondSpeedY
    secondShipData.speedX = 0.2 * secondSpeedX + 0.85 * firstSpeedX
    secondShipData.speedY = 0.2 * secondSpeedY + 0.85 * firstSpeedY
}


const updateShipData = () => {
    if (!isRestarting) {
        applyCollisionSpeedChange(ship1Data, ship2Data);
        ship2Data.positionX = collisionFixX(ship1Data, ship2Data);
        ship2Data.positionY = collisionFixY(ship1Data, ship2Data);
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
            // if (shipData.health <= 0 && isRestarting === false) {
            // isRestarting = true;
            // setTimeout(resetShipData, 3000)
            // }
        })
    }

}

setInterval(updateShipData, frameMilliseconds);


export default defineComponent({
    data() {
        return {
            ship1Data, ship2Data, pi: Math.PI, planets, maxHealth
        }
    },
});
</script>

<template>
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
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
        <circle v-if="ship1Data.afterburnerOn" class="ship1Afterburner" :cx="ship1Data.positionX - 2 * ship1Data.radius / 3"
            :cy="ship1Data.positionY" :r="2* ship1Data.radius / 3"
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
        <circle v-if="ship2Data.afterburnerOn" class="ship2Afterburner" :cx="ship2Data.positionX - 2 * ship2Data.radius / 3"
            :cy="ship2Data.positionY" :r="2 * ship2Data.radius / 3"
            :transform="`rotate(${180 * ship2Data.angleRadians / pi}, ${ship2Data.positionX}, ${ship2Data.positionY})`"
            fill="url(#grad1)" />
    </g>
    <text v-else x="830" y="500" font-family="monospace" stroke="url(#grad2)">
        Destroyed
    </text>
</template>