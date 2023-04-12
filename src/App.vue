<script lang="ts">
import { defineComponent } from "vue";
import PlanetSVG from "./components/PlanetSVG.vue";
import CheckpointSVG from "./components/CheckpointSVG.vue";
import GoalSVG from "./components/GoalSVG.vue";
import ShipSVGs from "./components/ShipSVGs.vue";
import HealthFuelBarSVGs from "./components/HealthFuelBarSVGs.vue";
import CompassSVGs from "./components/CompassSVGs.vue";
import AsteroidSVGs from "./components/AsteroidSVGs.vue";
import { spaceState, fixedCamera, getFocalPoint } from "./state/spaceState";
import { planets } from "./state/planetState";
import {
    viewboxWidth, viewboxHeight, blastZoneRadiusX, blastZoneRadiusY, blastZoneCenterX,
    blastZoneCenterY
} from "./constants/mapNumbers";
import InstructionsModal from "./components/InstructionsModal.vue";
import { shipState } from "./state/shipState";
import { checkpoints } from "./state/checkpointState";
import { goals } from "./state/goalState";

const getTransform = (zoom: number) => {
    const focalPoint = getFocalPoint();
    return `translate(${-focalPoint.positionX + viewboxWidth * Math.pow(2, -1 - zoom)}, ${-focalPoint.positionY + viewboxHeight * Math.pow(2, -1 - zoom)})`
}

export default defineComponent({

    data() {
        return {
            planets, viewboxWidth,
            viewboxHeight, blastZoneRadiusX, blastZoneRadiusY, blastZoneCenterX,
            blastZoneCenterY, spaceState, shipState, fixedCamera, checkpoints, goals, getTransform
        }
    },

    components: {
        CheckpointSVG,
        GoalSVG,
        PlanetSVG,
        ShipSVGs,
        InstructionsModal,
        AsteroidSVGs,
        HealthFuelBarSVGs,
        CompassSVGs,
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
                    <g :transform="getTransform(spaceState.zoom)">
                        <ellipse v-if="spaceState.gameMode === `battle`" fill="url(#space)" :cx="blastZoneCenterX"
                            :cy="blastZoneCenterY" :rx="blastZoneRadiusX" :ry="blastZoneRadiusY" />
                        <PlanetSVG v-bind:key="`${planet.positionX} ${planet.positionY}`" v-for="planet in planets"
                            :positionX="planet.positionX" :positionY="planet.positionY" :radius="planet.radius"
                            :mass="planet.mass" />
                        <CheckpointSVG v-bind:key="`checkpoint-${checkpoint.positionX} ${checkpoint.positionY}`"
                            v-for="checkpoint, index in checkpoints" :positionX="checkpoint.positionX"
                            :positionY="checkpoint.positionY" :radius="checkpoint.radius" :index="index" />
                        <GoalSVG v-bind:key="`goal-${goal.positionX} ${goal.positionY}`" v-for="goal, index in goals"
                            :positionX="goal.positionX" :positionY="goal.positionY" :radius="goal.radius" :index="index" />
                        <ShipSVGs v-if="spaceState.isStarted" />
                        <AsteroidSVGs v-if="spaceState.isStarted" />
                    </g>
                </g>
                <CompassSVGs v-if="spaceState.gameMode === `race`" />
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
</style>