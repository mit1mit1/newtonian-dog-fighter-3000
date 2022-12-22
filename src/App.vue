<script lang="ts">
import { defineComponent, reactive } from "vue";
import MusicControl from './gameMusic/MusicControl.vue';
import { distanceSquared } from "./utils/math";
import { collisionFixX, collisionFixY, gravityAccelerationX, gravityAccelerationY, resistanceAdjustmentX, resistanceAdjustmentY } from "./utils/physics";


let ship1Data = reactive({
    positionX: 550,
    positionY: 100,
    speedX: 0.4,
    speedY: 0.001,
    radius: 7,
    rearEngineOn: false,
    leftEngineOn: false,
    rightEngineOn: false,
    angleRadians: 0,
    angularMomentum: 0,
    health: 5000,
});

let ship2Data = reactive({
    positionX: 550,
    positionY: 440,
    speedX: -0.4,
    speedY: -0.001,
    radius: 7,
    rearEngineOn: false,
    leftEngineOn: false,
    rightEngineOn: false,
    angleRadians: 0,
    angularMomentum: 0,
    health: 5000,
});

const planet1Data = {
    positionX: 260,
    positionY: 270,
    radius: 30,
    mass: 1,
}

const planet2Data = {
    positionX: 840,
    positionY: 270,
    radius: 30,
    mass: 1,
}

const sunData = {
    positionX: 550,
    positionY: 270,
    radius: 100,
    mass: 35,
}


const planet3Data = {
    positionX: 400,
    positionY: 310,
    radius: 22,
    mass: 0.5,
}

const planet4Data = {
    positionX: 400,
    positionY: 230,
    radius: 22,
    mass: 0.5,
}

const planet5Data = {
    positionX: 700,
    positionY: 310,
    radius: 22,
    mass: 0.5,
}

const planet6Data = {
    positionX: 700,
    positionY: 230,
    radius: 22,
    mass: 0.5,
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
    if (distanceSquared(shipData.positionX, 0, shipData.positionY, 0) > 1500 ** 2) {
        return 5;
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
    firstShipData.speedX = 0.25 * firstSpeedX + 0.75 * secondSpeedX
    firstShipData.speedY = 0.25 * firstSpeedY + 0.75 * secondSpeedY
    secondShipData.speedX = 0.25 * secondSpeedX + 0.75 * firstSpeedX
    secondShipData.speedY = 0.25 * secondSpeedY + 0.75 * firstSpeedY
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
        [
            sunData,
            planet1Data,
            planet2Data,
            planet3Data,
            planet4Data,
            planet5Data,
            planet6Data
        ].forEach(planetData => {
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
            shipData.angularMomentum += 0.0007
        }
        if (shipData.rightEngineOn) {
            shipData.angularMomentum -= 0.0007
        }
        if (shipData.rearEngineOn) {
            shipData.speedX = shipData.speedX + 0.001 * Math.cos(shipData.angleRadians);
            shipData.speedY = shipData.speedY + 0.001 * Math.sin(shipData.angleRadians);
        }
    })

}

var t = setInterval(updateShipData, 0.05);

export default defineComponent({
    data() {
        return {
            ship1Data, ship2Data, sunData, planet1Data, planet2Data, planet3Data, planet4Data, pi: Math.PI, planet5Data
            , planet6Data
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
        <!-- <h1>
            Orbital Fighting Game
        </h1> -->
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
                <circle class="sun" :cx="sunData.positionX" :cy="sunData.positionY" :r="sunData.radius" fill="yellow" />
                <circle class="planet1" :cx="planet1Data.positionX" :cy="planet1Data.positionY" :r="planet1Data.radius"
                    fill="white" />
                <circle class="planet2" :cx="planet2Data.positionX" :cy="planet2Data.positionY" :r="planet2Data.radius"
                    fill="blue" />
                <circle class="planet3" :cx="planet3Data.positionX" :cy="planet3Data.positionY" :r="planet3Data.radius"
                    fill="green" />
                <circle class="planet4" :cx="planet4Data.positionX" :cy="planet4Data.positionY" :r="planet4Data.radius"
                    fill="teal" />
                <circle class="planet5" :cx="planet5Data.positionX" :cy="planet5Data.positionY" :r="planet5Data.radius"
                    fill="orange" />
                <circle class="planet6" :cx="planet6Data.positionX" :cy="planet6Data.positionY" :r="planet6Data.radius"
                    fill="brown" />
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
            </svg>
            <div>
                <span class="healthInfo">Ship 1 Health: {{ ship1Data.health }}</span>
                <span class="healthInfo">Ship 2 Health: {{ ship2Data.health }}</span>
            </div>
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

.healthInfo {
    margin-right: 50px;
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
    margin-bottom: 10px;
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