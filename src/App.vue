<script lang="ts">
import { defineComponent } from "vue";
import MusicControl from './gameMusic/MusicControl.vue';
import PlanetSVG from "./components/PlanetSVG.vue";
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

export default defineComponent({

    data() {
        const fixedCamera = "fixed"
        let cameraMode: "fixed" | 0 | 1 = "fixed";
        return {
            planets, viewboxWidth,
            viewboxHeight, blastZoneRadiusX, blastZoneRadiusY, blastZoneCenterX,
            blastZoneCenterY, spaceState, shipState, cameraMode, fixedCamera
        }
    },

    components: {
        MusicControl,
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
                <g :transform="`translate(${cameraMode !== fixedCamera && shipState.ships[cameraMode] ?
                    -shipState.ships[cameraMode].positionX + viewboxWidth / 2 : 0}, ${cameraMode !== fixedCamera && shipState.ships[cameraMode] ?
                    -shipState.ships[cameraMode].positionY + viewboxHeight / 2 : 0})`">
                    <ellipse fill="url(#space)" :cx="blastZoneCenterX" :cy="blastZoneCenterY" :rx="blastZoneRadiusX"
                        :ry="blastZoneRadiusY" />
                    <PlanetSVG v-for="planet in planets" :positionX="planet.positionX" :positionY="planet.positionY"
                        :radius="planet.radius" :mass="planet.mass" />
                    <ShipSVGs v-if="spaceState.isStarted" />
                    <AsteroidSVGs v-if="spaceState.isStarted" />
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