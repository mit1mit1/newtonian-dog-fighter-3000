<script lang="ts">
import { defineComponent, reactive } from "vue";
import MusicControl from './gameMusic/MusicControl.vue';


let ship1Data = reactive({
    positionX: 350,
    positionY: 150,
    speedX: 0.001,
    speedY: 0.001,
    radius: 5,
    rearEngineOn: false,
    leftEngineOn: false,
    rightEngineOn: false,
    angleRadians: 0,
    angularMomentum: 0,
});

let ship2Data = reactive({
    positionX: 500,
    positionY: 350,
    speedX: 0.0001,
    speedY: 0.0001,
    radius: 5,
    rearEngineOn: false,
    leftEngineOn: false,
    rightEngineOn: false,
    angleRadians: 0,
    angularMomentum: 0,
});


const sunData = {
    positionX: 550,
    positionY: 270,
    radius: 100,
    mass: 30,
}

const planet1Data = {
    positionX: 300,
    positionY: 250,
    radius: 40,
    mass: 10,
}

const planet2Data = {
    positionX: 800,
    positionY: 250,
    radius: 40,
    mass: 10,
}

const planet3Data = {
    positionX: 400,
    positionY: 300,
    radius: 30,
    mass: 6,
}

const planet4Data = {
    positionX: 400,
    positionY: 200,
    radius: 30,
    mass: 6,
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
    if (e.key === "l") {
        ship2Data.leftEngineOn = true;
    }
    if (e.key === "j") {
        ship2Data.rightEngineOn = true;
    }
    if (e.key === "i") {
        ship2Data.rearEngineOn = true;
    }
}

const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === "d") {
        ship1Data.leftEngineOn = false;
    }
    if (e.key === "a") {
        ship1Data.rightEngineOn = false;
    }
    if (e.key === "") {
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


const distanceSquared = (x1: number, x2: number, y1: number, y2: number) => {
    return (x2 - x1) ** 2 + (y2 - y1) ** 2
}

const directionMultiplier = (x1: number, x2: number) => {
    return (x2 - x1) / Math.abs(x1 - x2)
}

const xComponent = (x1: number, x2: number, y1: number, y2: number) => {
    return (x2 - x1) ** 2 / ((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

const yComponent = (x1: number, x2: number, y1: number, y2: number) => {
    return (y2 - y1) ** 2 / ((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

const gravityAccelerationX = (planetData: { radius: number, mass: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, },) => {
    const d2 = (distanceSquared(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY));
    if (d2 < 4) {
        return 0
    } else if (d2 < planetData.radius ** 2) {
        return planetData.mass * directionMultiplier(shipData.positionX, planetData.positionX) * xComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) / d2 ** 3
    }
    return planetData.mass * directionMultiplier(shipData.positionX, planetData.positionX) * xComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) / d2
}
const gravityAccelerationY = (planetData: { radius: number, mass: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, },) => {
    const d2 = (distanceSquared(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY));
    if (d2 < (0.25 * planetData.radius) ** 2) {
        return 0
    } else if (d2 < planetData.radius ** 2) {
        return 0.01 * planetData.mass * directionMultiplier(shipData.positionY, planetData.positionY) * yComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) / d2
    }
    return planetData.mass * directionMultiplier(shipData.positionY, planetData.positionY) * yComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) / d2
}

const collisionAccelerationX = (planetData: { radius: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, radius: number, speedX: number, speedY: number },) => {
    if (distanceSquared(planetData.positionX, shipData.positionX, planetData.positionY, shipData.positionY) > (planetData.radius + shipData.radius) ** 2) {
        return 0;
    }
    return -1.75 * shipData.speedX * xComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY)
}
const collisionAccelerationY = (planetData: { radius: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, radius: number, speedX: number, speedY: number },) => {
    if (distanceSquared(planetData.positionX, shipData.positionX, planetData.positionY, shipData.positionY) > (planetData.radius + shipData.radius) ** 2) {
        return 0;
    }
    return -1.75 * shipData.speedY * yComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY)
}

const resistanceAdjustmentX = (planetData: { radius: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, radius: number, speedX: number, speedY: number },) => {
    if (distanceSquared(planetData.positionX, shipData.positionX, planetData.positionY, shipData.positionY) > (planetData.radius + shipData.radius) ** 2) {
        return shipData.speedX;
    }
    return shipData.speedX * 0.999
}
const resistanceAdjustmentY = (planetData: { radius: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, radius: number, speedX: number, speedY: number },) => {
    if (distanceSquared(planetData.positionX, shipData.positionX, planetData.positionY, shipData.positionY) > (planetData.radius + shipData.radius) ** 2) {
        return shipData.speedY;
    }
    return shipData.speedY * 0.999
}

const collisionFixX = (planetData: { radius: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, radius: number, speedX: number, speedY: number },) => {
    if (distanceSquared(planetData.positionX, shipData.positionX, planetData.positionY, shipData.positionY) > (planetData.radius + shipData.radius) ** 2) {
        return shipData.positionX;
    }
    return planetData.positionX - directionMultiplier(shipData.positionX, planetData.positionX) * xComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) * (planetData.radius + shipData.radius + 3)
}
const collisionFixY = (planetData: { radius: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, radius: number, speedX: number, speedY: number },) => {
    if (distanceSquared(planetData.positionX, shipData.positionX, planetData.positionY, shipData.positionY) > (planetData.radius + shipData.radius) ** 2) {
        return shipData.positionY;
    }

    return planetData.positionY - directionMultiplier(shipData.positionY, planetData.positionY) * yComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) * (planetData.radius + shipData.radius + 3)
}


const updateShipData = () => {
    // ship1Data.speedX = ship1Data.speedX + collisionAccelerationX(ship2Data, ship1Data);
    // ship1Data.speedY = ship1Data.speedY + collisionAccelerationY(ship2Data, ship1Data);
    // ship1Data.positionX = collisionFixX(ship2Data, ship1Data);
    // ship1Data.positionY = collisionFixY(ship2Data, ship1Data);
    // ship2Data.speedX = ship2Data.speedX + collisionAccelerationX(ship1Data, ship2Data);
    // ship2Data.speedY = ship2Data.speedY + collisionAccelerationY(ship1Data, ship2Data);
    ship2Data.positionX = collisionFixX(ship1Data, ship2Data);
    ship2Data.positionY = collisionFixY(ship1Data, ship2Data);
    [ship1Data, ship2Data].forEach(shipData => {
        shipData.positionX = shipData.positionX + shipData.speedX;
        shipData.positionY = shipData.positionY + shipData.speedY;
        [sunData, planet1Data, planet2Data, planet3Data, planet4Data].forEach(planetData => {
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
        shipData.angularMomentum *= 0.99
        if (shipData.leftEngineOn) {
            shipData.angularMomentum += 0.001
        }
        if (shipData.rightEngineOn) {
            shipData.angularMomentum -= 0.001
        }
        if (shipData.rearEngineOn) {
            shipData.speedX = shipData.speedX + 0.0015 * Math.cos(shipData.angleRadians);
            shipData.speedY = shipData.speedY + 0.0015 * Math.sin(shipData.angleRadians);
        }
    })

}

var t = setInterval(updateShipData, 0.05);

export default defineComponent({
    data() {
        return {
            ship1Data, ship2Data, sunData, planet1Data, planet2Data, planet3Data, planet4Data, pi: Math.PI
        }
    },

    methods: {
        handleKeydown, handleKeyup
    },

    components: {
        MusicControl,
    }
});
</script>

<template>
    <main id="clickableGame">
        <h1>
            Orbital Fighting Game
        </h1>
        <div class="game-screen">
            <svg class="spaaace" viewBox="0 0 1100 540">
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
                <circle class="sun" :cx="sunData.positionX" :cy="sunData.positionY" :r="sunData.radius"
                    fill="yellow" />
                <circle class="planet1" :cx="planet1Data.positionX" :cy="planet1Data.positionY" :r="planet1Data.radius"
                    fill="white" />
                <circle class="planet2" :cx="planet2Data.positionX" :cy="planet2Data.positionY" :r="planet2Data.radius"
                    fill="blue" />
                <circle class="planet3" :cx="planet3Data.positionX" :cy="planet3Data.positionY" :r="planet3Data.radius"
                    fill="green" />
                <circle class="planet4" :cx="planet4Data.positionX" :cy="planet4Data.positionY" :r="planet4Data.radius"
                    fill="teal" />
                <circle class="ship1" :cx="ship1Data.positionX" :cy="ship1Data.positionY" :r="ship1Data.radius"
                    :transform="`rotate(${180 * ship1Data.angleRadians / pi}, ${ship1Data.positionX}, ${ship1Data.positionY})`"
                    fill="url(#grad1)" />
                <circle class="ship2" :cx="ship2Data.positionX" :cy="ship2Data.positionY" :r="ship2Data.radius"
                    :transform="`rotate(${180 * ship2Data.angleRadians / pi}, ${ship2Data.positionX}, ${ship2Data.positionY})`"
                    fill="url(#grad2)" />
            </svg>
            <div class="music-control-box">
                <MusicControl />
            </div>
        </div>
    </main>
</template>

<style>
h1 {
    text-align: center;
    font-family: monospace;
    font-weight: normal;
    margin-bottom: 20px;
}

html {
    background-color: #eee;
    font-family: Merriweather;
}

.spaaace {
    background-color: black;
    width: 1100px;
    height: 540px;
    position: relative;
}

.game-screen {
    margin-left: auto;
    margin-right: auto;
    max-width: 1100px;
    margin-bottom: 100px;
}



.napoleonic-button {
    margin-right: 10px;
    margin-bottom: 5px;
    transition-duration: 0.4s;
    border: none;
    padding: 8px 12px;
    min-height: 40px;
    min-width: 100px;
    font-size: 0.95em;
    font-family: "Quicksand", sans-serif;
}

.napoleonic-button:hover {
    background-color: #ffb7c5;
    cursor: pointer;
}

.music-control-box {
    position: absolute;
    top: 40px;
}
</style>