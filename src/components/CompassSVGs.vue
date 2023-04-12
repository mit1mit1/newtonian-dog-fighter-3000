<script lang="ts">
import { maxHealth, maxFuel } from "@/constants/ships";
import { shipState } from "@/state/shipState";
import { checkpoints } from "@/state/checkpointState";
import { gameState } from "@/state/gameState";
import { distanceBetween, radiansBetween } from "@/utils/math"
import { defineComponent } from "vue";
import { frameMilliseconds } from "@/constants/physics";
import { secondsSinceStart, getNextTarget } from "@/utils/game";
import ShipSVG from "./ShipSVG.vue";
import { goals } from "@/state/goalState";


export default defineComponent({
    data() {
        return {
            shipState,
            maxHealth,
            maxFuel,
            goals,
            checkpoints,
            radiansBetween,
            distanceBetween,
            gameState,
            frameMilliseconds,
            secondsSinceStart,
            getNextTarget,
        };
    },
    components: { ShipSVG },
    computed: {
        ship1Target() {
            return shipState.ships.length > 0 && getNextTarget(shipState.ships[0], goals, checkpoints)
        },

        ship2Target() {
            return shipState.ships.length > 1 && getNextTarget(shipState.ships[1], goals, checkpoints)
        }
    }
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

    <g v-if="ship1Target">
        <text x="50" y="460" font-family="monospace" stroke="url(#grad1)">
            {{ (distanceBetween(ship1Target, shipState.ships[0]) -
                ship1Target.radius - shipState.ships[0].radius).toFixed(0) }} au
        </text>
        <text v-if="shipState.ships[0].startFrame" x="210" y="460" font-family="monospace" stroke="url(#grad2)">
            {{ secondsSinceStart(shipState.ships[0], gameState.frameNumber) }} s
        </text>
        <g :transform="`rotate(${radiansBetween(ship1Target, shipState.ships[0]) * 180 / Math.PI}, 150, 400)`">
            <text x="150" y="400" font-family="monospace" stroke="url(#grad1)">
                --->
            </text>
        </g>
    </g>
    <ShipSVG v-if="shipState.ships.length > 0" :positionX="150" :positionY="455" :fuel="shipState.ships[0].fuel"
        :afterburnerOn="shipState.ships[0].afterburnerOn" :rearEngineOn="shipState.ships[0].rearEngineOn"
        :angleRadians="shipState.ships[0].angleRadians" :radius="5" baseColor="url(#grad1)" secondaryColor="url(#grad2)" />
    <g v-if="ship2Target">
        <text x="800" y="460" font-family="monospace" stroke="url(#grad2)">
            {{ (distanceBetween(ship2Target, shipState.ships[1]) -
                ship2Target.radius - shipState.ships[1].radius).toFixed(0) }} au
        </text>
        <text v-if="shipState.ships[1].nextCheckpoint > 0" x="960" y="460" font-family="monospace" stroke="url(#grad1)">
            {{ ((gameState.frameNumber - (shipState.ships[1].startFrame || 0)) * frameMilliseconds / 1000).toFixed(1) }} s
        </text>
        <g :transform="`rotate(${radiansBetween(ship2Target, shipState.ships[1]) * 180 / Math.PI}, 900, 400)`">
            <text x="900" y="400" font-family="monospace" stroke="url(#grad2)">
                --->
            </text>
        </g>
    </g>
    <ShipSVG v-if="shipState.ships.length > 1" :positionX="900" :positionY="455" :fuel="shipState.ships[1].fuel"
        :afterburnerOn="shipState.ships[1].afterburnerOn" :rearEngineOn="shipState.ships[1].rearEngineOn"
        :angleRadians="shipState.ships[1].angleRadians" :radius="5" baseColor="url(#grad2)" secondaryColor="url(#grad1)" />
</template>