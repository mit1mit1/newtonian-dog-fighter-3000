<script lang="ts">
import { defineComponent, reactive } from "vue";
import MusicControl from './gameMusic/MusicControl.vue';


let ship1Data = reactive({
    positionX: 350,
    positionY: 150,
    speedX: 0.1,
    speedY: 0.1,
    radius: 5,
    rearEngineOn: false,
    leftEngineOn: false,
    rightEngineOn: false,
    angle: 2,
    angularMomentum: 0,
});

const planet1Data = {
    positionX: 250,
    positionY: 250,
    radius: 30,
    mass: 5,
}

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "a") {
        ship1Data.leftEngineOn = true;
    }
    if (e.key === "d") {
        ship1Data.rightEngineOn = true;
    }
    if (e.key === "w") {
        ship1Data.rearEngineOn = true;
    }
}

const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === "a") {
        ship1Data.leftEngineOn = false;
    }
    if (e.key === "d") {
        ship1Data.rightEngineOn = false;
    }
    if (e.key === "w") {
        ship1Data.rearEngineOn = false;
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

const gravityAccelerationX = (planetData: { mass: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, },) => {
    return planet1Data.mass * directionMultiplier(shipData.positionX, planetData.positionX) * xComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) / (distanceSquared(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY))
}
const gravityAccelerationY = (planetData: { mass: number, positionX: number, positionY: number, }, shipData: { positionX: number, positionY: number, },) => {
    return planetData.mass * directionMultiplier(shipData.positionY, planetData.positionY) * yComponent(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY) / (distanceSquared(shipData.positionX, planetData.positionX, shipData.positionY, planetData.positionY))
}


const updateShipData = () => {
    ship1Data.positionX = ship1Data.positionX + ship1Data.speedX;
    ship1Data.positionY = ship1Data.positionY + ship1Data.speedY;
    ship1Data.speedX = ship1Data.speedX + gravityAccelerationX(planet1Data, ship1Data);
    ship1Data.speedY = ship1Data.speedY + gravityAccelerationY(planet1Data, ship1Data);

    ship1Data.angle = ship1Data.angle + ship1Data.angularMomentum;
    ship1Data.angularMomentum *= 0.9
    if (ship1Data.leftEngineOn) {
        ship1Data.angularMomentum += 0.01
    }
    if (ship1Data.rightEngineOn) {
        ship1Data.angularMomentum -= 0.01
    }
    if (ship1Data.rearEngineOn) {
        ship1Data.speedX = ship1Data.speedX + 0.0005 * Math.cos(ship1Data.angle);
        ship1Data.speedY = ship1Data.speedY + 0.0005 * Math.sin(ship1Data.angle);
    }

}

var t = setInterval(updateShipData, 0.05);

export default defineComponent({
    data() {
        return {
            ship1Data, planet1Data
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
                </defs>
                <circle class="planet1" :cx="planet1Data.positionX" :cy="planet1Data.positionY" :r="planet1Data.radius"
                    fill="white" />
                <circle class="ship1" :cx="ship1Data.positionX" :cy="ship1Data.positionY" :r="ship1Data.radius"
                    :transform="`rotate(${ship1Data.angle}, ${ship1Data.positionX}, ${ship1Data.positionY})`"
                    fill="url(#grad1)" />
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