<script lang="ts">
import { maxHealth, maxFuel } from "@/constants/ships";
import { shipState } from "@/state/shipState";
import { goals } from "@/state/goalState";
import { distanceBetween, radiansBetween } from "@/utils/math"
import { defineComponent } from "vue";


export default defineComponent({
    data() {
        return {
            shipState, maxHealth, maxFuel, goals, radiansBetween, distanceBetween
        }
    },

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
            {{ (distanceBetween(goals[shipState.ships[0].nextGoal], shipState.ships[0]) - goals[shipState.ships[0].nextGoal].radius - shipState.ships[0].radius).toFixed(2) }}
        </text>
        <g
            :transform="`rotate(${radiansBetween(goals[shipState.ships[0].nextGoal], shipState.ships[0]) * 180 / Math.PI}, 50, 400)`">
            <text x="50" y="400" font-family="monospace" stroke="url(#grad1)">
                --->
            </text>
        </g>
    </g>
    <g v-if="shipState.ships.length > 1 && goals[shipState.ships[1].nextGoal]">
        <text x="800" y="460" font-family="monospace" stroke="url(#grad2)">
            {{ (distanceBetween(goals[shipState.ships[1].nextGoal], shipState.ships[1]) - goals[shipState.ships[1].nextGoal].radius - shipState.ships[1].radius).toFixed(2) }}
        </text>
        <g
            :transform="`rotate(${radiansBetween(goals[shipState.ships[1].nextGoal], shipState.ships[1]) * 180 / Math.PI}, 800, 400)`">
            <text x="800" y="400" font-family="monospace" stroke="url(#grad2)">
                --->
            </text>
        </g>
    </g>
</template>