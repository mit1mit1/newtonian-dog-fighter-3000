<script lang="ts">
import { blastZoneCenterX, blastZoneCenterY, blastZoneRadiusX, blastZoneRadiusY } from "@/constants/mapNumbers.js";
import { planets } from "@/constants/planets";
import { distanceSquared } from "@/utils/math";
import { collisionFixX, collisionFixY, gravityAccelerationX, gravityAccelerationY, resistanceAdjustmentX, resistanceAdjustmentY } from "@/utils/physics";
import { defineComponent, reactive } from "vue";

const frameMilliseconds = 2;
const maxHealth = 5000;

const baseShipRadius = 7;

let ship1Data = reactive({
    positionX: 550,
    positionY: 100,
    speedX: 0.4,
    speedY: 0.001,
    radius: baseShipRadius,
    rearEngineOn: false,
    leftEngineOn: false,
    rightEngineOn: false,
    angleRadians: 0,
    angularMomentum: 0,
    health: maxHealth,
    rearEngineThrust: 0.0018,
    sideEngineThrust: 0.0007,
});

let ship2Data = reactive({
    positionX: 550,
    positionY: 440,
    speedX: -0.4,
    speedY: -0.001,
    radius: baseShipRadius,
    rearEngineOn: false,
    leftEngineOn: false,
    rightEngineOn: false,
    angleRadians: 0,
    angularMomentum: 0,
    health: maxHealth,
    rearEngineThrust: 0.0018,
    sideEngineThrust: 0.0007,
});

const enlargen = (shipData: { radius: number }) => {
    if (shipData.radius === baseShipRadius) {
        shipData.radius += 5;
        setTimeout(() => shipData.radius -= 5, frameMilliseconds * 60)
    }
}

const hide = (shipData: { radius: number }) => {
    if (shipData.radius === baseShipRadius) {
        shipData.radius = 0;
        setTimeout(() => shipData.radius = baseShipRadius, frameMilliseconds * 100)
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
        enlargen(ship1Data);
    }
    if (e.key === "o") {
        hide(ship1Data);
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
    // ship1Data.speedX = ship1Data.speedX + collisionAccelerationX(ship2Data, ship1Data);
    // ship1Data.speedY = ship1Data.speedY + collisionAccelerationY(ship2Data, ship1Data);
    // ship1Data.positionX = collisionFixX(ship2Data, ship1Data);
    // ship1Data.positionY = collisionFixY(ship2Data, ship1Data);
    // ship2Data.speedX = ship2Data.speedX + collisionAccelerationX(ship1Data, ship2Data);
    // ship2Data.speedY = ship2Data.speedY + collisionAccelerationY(ship1Data, ship2Data);
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
            // shipData.speedX = shipData.speedX + collisionAccelerationX(planetData, shipData);
            // shipData.speedY = shipData.speedY + collisionAccelerationY(planetData, shipData);
            // shipData.positionX = collisionFixX(planetData, shipData);
            // shipData.positionY = collisionFixY(planetData, shipData);
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
    })

}

var t = setInterval(updateShipData, frameMilliseconds);


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
    <rect class="healthBar" x="50" y="500" :width="200 * ship1Data.health / maxHealth" height="20" rx="5"
        fill="url(#grad1)" />
    <rect class="healthBar" x="800" y="500" :width="200 * ship2Data.health / maxHealth" height="20" rx="5"
        fill="url(#grad2)" />
    <circle class="ship1" :cx="ship1Data.positionX" :cy="ship1Data.positionY" :r="ship1Data.radius"
        :transform="`rotate(${180 * ship1Data.angleRadians / pi}, ${ship1Data.positionX}, ${ship1Data.positionY})`"
        fill="url(#grad1)" />
    <circle v-if="ship1Data.rearEngineOn" class="ship1Burner" :cx="ship1Data.positionX - 2 * ship1Data.radius / 3"
        :cy="ship1Data.positionY" :r="ship1Data.radius / 2"
        :transform="`rotate(${180 * ship1Data.angleRadians / pi}, ${ship1Data.positionX}, ${ship1Data.positionY})`"
        fill="url(#grad2)" />
    <circle class="ship2" :cx="ship2Data.positionX" :cy="ship2Data.positionY" :r="ship2Data.radius"
        :transform="`rotate(${180 * ship2Data.angleRadians / pi}, ${ship2Data.positionX}, ${ship2Data.positionY})`"
        fill="url(#grad2)" />
    <circle v-if="ship2Data.rearEngineOn" class="ship1Burner" :cx="ship2Data.positionX - 2 * ship2Data.radius / 3"
        :cy="ship2Data.positionY" :r="ship2Data.radius / 2"
        :transform="`rotate(${180 * ship2Data.angleRadians / pi}, ${ship2Data.positionX}, ${ship2Data.positionY})`"
        fill="url(#grad1)" />

</template>