<script lang="ts">
import { maxHealth, maxFuel } from "@/constants/ships";
import { shipState } from "@/state/shipState";
import { goals } from "@/state/goalState";
import { gameState } from "@/state/gameState";
import { distanceBetween, radiansBetween } from "@/utils/math"
import { defineComponent } from "vue";
import { frameMilliseconds } from "@/constants/physics";
import { secondsSinceStart } from "@/utils/game";
import ShipSVG from "./ShipSVG.vue";


export default defineComponent({
    data() {
        return {
            shipState,
            maxHealth,
            maxFuel,
            goals,
            radiansBetween,
            distanceBetween,
            gameState,
            frameMilliseconds,
            secondsSinceStart
        };
    },
    components: { ShipSVG }
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

    <g v-if="shipState.ships.length > 0 && goals[shipState.ships[0].nextGoal]">
        <text x="50" y="460" font-family="monospace" stroke="url(#grad1)">
            {{ (distanceBetween(goals[shipState.ships[0].nextGoal], shipState.ships[0]) -
                goals[shipState.ships[0].nextGoal].radius - shipState.ships[0].radius).toFixed(0) }} au
        </text>
        <text v-if="shipState.ships[0].nextGoal > 0" x="210" y="460" font-family="monospace" stroke="url(#grad2)">
            {{ secondsSinceStart(shipState.ships[0], gameState.frameNumber) }} s
        </text>
        <g
            :transform="`rotate(${radiansBetween(goals[shipState.ships[0].nextGoal], shipState.ships[0]) * 180 / Math.PI}, 150, 400)`">
            <text x="150" y="400" font-family="monospace" stroke="url(#grad1)">
                --->
            </text>
        </g>

        <ShipSVG :positionX="150" :positionY="455" :fuel="shipState.ships[0].fuel"
            :afterburnerOn="shipState.ships[0].afterburnerOn" :rearEngineOn="shipState.ships[0].rearEngineOn"
            :angleRadians="shipState.ships[0].angleRadians" :radius="5" baseColor="url(#grad1)"
            secondaryColor="url(#grad2)" />
    </g>
    <g v-if="shipState.ships.length > 1 && goals[shipState.ships[1].nextGoal]">
        <text x="800" y="460" font-family="monospace" stroke="url(#grad2)">
            {{ (distanceBetween(goals[shipState.ships[1].nextGoal], shipState.ships[1]) -
                goals[shipState.ships[1].nextGoal].radius - shipState.ships[1].radius).toFixed(0) }} au
        </text>
        <text v-if="shipState.ships[1].nextGoal > 0" x="960" y="460" font-family="monospace" stroke="url(#grad1)">
            {{ ((gameState.frameNumber - (shipState.ships[1].startFrame || 0)) * frameMilliseconds / 1000).toFixed(1) }} s
        </text>
        <g
            :transform="`rotate(${radiansBetween(goals[shipState.ships[1].nextGoal], shipState.ships[1]) * 180 / Math.PI}, 900, 400)`">
            <text x="900" y="400" font-family="monospace" stroke="url(#grad2)">
                --->
            </text>
        </g>
        <ShipSVG :positionX="900" :positionY="455" :fuel="shipState.ships[1].fuel"
            :afterburnerOn="shipState.ships[1].afterburnerOn" :rearEngineOn="shipState.ships[1].rearEngineOn"
            :angleRadians="shipState.ships[1].angleRadians" :radius="5" baseColor="url(#grad2)"
            secondaryColor="url(#grad1)" />
    </g>
</template>