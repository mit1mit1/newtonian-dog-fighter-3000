<script lang="ts">
import { maxHealth, maxFuel } from "@/constants/ships";
import { shipState } from "@/state/shipState";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            shipState, maxHealth, maxFuel,
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
    <rect v-if="shipState.ships.length > 0 && shipState.ships[0].health >= 0" class="healthBar" x="50" y="500"
        :width="200 * shipState.ships[0].health / maxHealth" height="20" rx="5" fill="url(#grad1)" />
    <rect v-if="shipState.ships.length > 1 && shipState.ships[1].health >= 0" class="healthBar" x="800" y="500"
        :width="200 * shipState.ships[1].health / maxHealth" height="20" rx="5" fill="url(#grad2)" />

    <rect v-if="shipState.ships.length > 0 && shipState.ships[0].fuel >= 0" class="fuelBar" x="50" y="550"
        :width="200 * shipState.ships[0].fuel / maxFuel" height="10" rx="5" fill="url(#grad2)" />
    <rect v-if="shipState.ships.length > 1 && shipState.ships[1].fuel >= 0" class="fuelBar" x="800" y="550"
        :width="200 * shipState.ships[1].fuel / maxFuel" height="10" rx="5" fill="url(#grad1)" />
    <text v-if="shipState.ships.length > 0 && shipState.ships[0].health < 0" x="80" y="500" font-family="monospace" stroke="url(#grad1)">
        Destroyed
    </text>
    <text v-else-if="shipState.ships.length > 1 && shipState.ships[1].health < 0" x="830" y="500" font-family="monospace" stroke="url(#grad2)">
        Destroyed
    </text>
</template>