<script lang="ts">
import { defineComponent } from "vue";
import MusicControl from './gameMusic/MusicControl.vue';
import PlanetSVG from "./components/PlanetSVG.vue";
import GoalSVG from "./components/GoalSVG.vue";
import ShipSVGs from "./components/ShipSVGs.vue";
import HealthFuelBarSVGs from "./components/HealthFuelBarSVGs.vue";
import AsteroidSVGs from "./components/AsteroidSVGs.vue";
import { spaceState } from "./state/spaceState";
import { planets } from "./state/planetState";
import {
    viewboxWidth, viewboxHeight, blastZoneRadiusX, blastZoneRadiusY, blastZoneCenterX,
    blastZoneCenterY
} from "./constants/mapNumbers";
import InstructionsModal from "./components/InstructionsModal.vue";
import { shipState } from "./state/shipState";
import { goals } from "./state/goalState";

export default defineComponent({

    data() {
        return {
            planets, viewboxWidth,
            viewboxHeight, blastZoneRadiusX, blastZoneRadiusY, blastZoneCenterX,
            blastZoneCenterY, spaceState, shipState, fixedCamera: "fixed", goals
        }
    },

    components: {
        MusicControl,
        GoalSVG,
        PlanetSVG,
        ShipSVGs,
        InstructionsModal,
        AsteroidSVGs,
        HealthFuelBarSVGs,
    }
});
</script>

<template>
    <main id="clickableGame">
        <div class="game-screen">
            <svg class="spaaace" :viewBox="`0 0 ${viewboxWidth} ${viewboxHeight}`">

                <defs>
                    <linearGradient id="space" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:rgb(80,50,0);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:rgb(0,20,80);stop-opacity:1" />
                    </linearGradient>
                </defs>
                <g :transform="`scale(${Math.pow(2, spaceState.zoom)}, ${Math.pow(2, spaceState.zoom)})`">
                    <g
                        :transform="`translate(${spaceState.cameraMode !== fixedCamera && shipState.ships[spaceState.cameraMode as number] ?
                            -shipState.ships[spaceState.cameraMode as number].positionX + viewboxWidth * Math.pow(2, -1 - spaceState.zoom) : 0}, ${spaceState.cameraMode !== fixedCamera && shipState.ships[spaceState.cameraMode as number] ?
                                -shipState.ships[spaceState.cameraMode as number].positionY + viewboxHeight * Math.pow(2, -1 - spaceState.zoom) : 0})`">
                        <ellipse v-if="spaceState.gameMode === `battle`" fill="url(#space)" :cx="blastZoneCenterX"
                            :cy="blastZoneCenterY" :rx="blastZoneRadiusX" :ry="blastZoneRadiusY" />
                        <PlanetSVG v-bind:key="`${planet.positionX} ${planet.positionY}`" v-for="planet in planets"
                            :positionX="planet.positionX" :positionY="planet.positionY" :radius="planet.radius"
                            :mass="planet.mass" />
                        <GoalSVG v-bind:key="`${goal.positionX} ${goal.positionY}`" v-for="goal, index in goals"
                            :positionX="goal.positionX" :positionY="goal.positionY" :radius="goal.radius" :index="index" />
                        <ShipSVGs v-if="spaceState.isStarted" />
                        <AsteroidSVGs v-if="spaceState.isStarted" />
                    </g>
                </g>
                <HealthFuelBarSVGs v-if="spaceState.isStarted" />
            </svg>
        </div>
    </main>
    <InstructionsModal />
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
    background-color: rgb(80, 40, 80);
    font-family: Merriweather;
}

.spaaace {
    width: 1100px;
    height: 540px;
    position: relative;
    overflow: visible;
}

.game-screen {
    margin-left: auto;
    margin-right: auto;
    max-width: 1100px;
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
</style>