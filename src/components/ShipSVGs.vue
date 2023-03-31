<script lang="ts">
import { maxHealth, maxFuel } from "@/constants/ships";
import { gameState } from "@/state/gameState";
import { shipState } from "@/state/shipState";
import { defineComponent } from "vue";

const handlePlayer1Keypress = (e: KeyboardEvent) => {
    // Player 1
    if (e.key === "d") {
        shipState.ships[0].leftEngineOn = true;
    }
    if (e.key === "a") {
        shipState.ships[0].rightEngineOn = true;
    }
    if (e.key === "w") {
        shipState.ships[0].rearEngineOn = true;
    }
    if (e.key === "q") {
        shipState.enlargenShip(0);
    }
    if (e.key === "e") {
        shipState.hideShip(0);
    }
    if (e.key === "s") {
        shipState.fireAfterburner(0);
    }
}
const handlePlayer2Keypress = (e: KeyboardEvent) => {
    // Player 2
    if (e.key === "l") {
        shipState.ships[1].leftEngineOn = true;
    }
    if (e.key === "j") {
        shipState.ships[1].rightEngineOn = true;
    }
    if (e.key === "i") {
        shipState.ships[1].rearEngineOn = true;
    }
    if (e.key === "u") {
        shipState.enlargenShip(1);
    }
    if (e.key === "o") {
        shipState.hideShip(1);
    }
    if (e.key === "k") {
        shipState.fireAfterburner(1);
    }
}

const handlePlayer1Keyup = (e: KeyboardEvent) => {
    if (e.key === "d") {
        shipState.ships[0].leftEngineOn = false;
    }
    if (e.key === "a") {
        shipState.ships[0].rightEngineOn = false;
    }
    if (e.key === "w") {
        shipState.ships[0].rearEngineOn = false;
    }
}

const handlePlayer2Keyup = (e: KeyboardEvent) => {
    if (e.key === "l") {
        shipState.ships[1].leftEngineOn = false;
    }
    if (e.key === "j") {
        shipState.ships[1].rightEngineOn = false;
    }
    if (e.key === "i") {
        shipState.ships[1].rearEngineOn = false;
    }
}


document.addEventListener("keydown", handlePlayer1Keypress);
document.addEventListener("keyup", handlePlayer1Keyup);

if (!gameState.player2AI) {
    document.addEventListener("keydown", handlePlayer2Keypress);
    document.addEventListener("keyup", handlePlayer2Keyup);
}




export default defineComponent({
    data() {
        return {
            shipState, pi: Math.PI, maxHealth, maxFuel,
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
    <g v-if="shipState.ships.length > 0 && shipState.ships[0].health >= 0">
        <circle v-if="shipState.ships[0].rearEngineOn && shipState.ships[0].fuel > 0" class="ship1Burner"
            :cx="shipState.ships[0].positionX - shipState.ships[0].radius" :cy="shipState.ships[0].positionY"
            :r="shipState.ships[0].radius / 2"
            :transform="`rotate(${180 * shipState.ships[0].angleRadians / pi}, ${shipState.ships[0].positionX}, ${shipState.ships[0].positionY})`"
            fill="url(#grad2)" />
        <circle v-if="shipState.ships[0].afterburnerOn && shipState.ships[0].fuel > 0" class="ship1Afterburner"
            :cx="shipState.ships[0].positionX - shipState.ships[0].radius" :cy="shipState.ships[0].positionY"
            :r="2 * shipState.ships[0].radius / 3"
            :transform="`rotate(${180 * shipState.ships[0].angleRadians / pi}, ${shipState.ships[0].positionX}, ${shipState.ships[0].positionY})`"
            fill="url(#grad2)" />
        <circle class="ship1" :cx="shipState.ships[0].positionX" :cy="shipState.ships[0].positionY"
            :r="shipState.ships[0].radius"
            :transform="`rotate(${180 * shipState.ships[0].angleRadians / pi}, ${shipState.ships[0].positionX}, ${shipState.ships[0].positionY})`"
            fill="url(#grad1)" />
    </g>
    <g v-if="shipState.ships.length > 1 && shipState.ships[1].health >= 0">
        <circle v-if="shipState.ships[1].rearEngineOn && shipState.ships[1].fuel > 0" class="ship2Burner"
            :cx="shipState.ships[1].positionX - shipState.ships[1].radius" :cy="shipState.ships[1].positionY"
            :r="shipState.ships[1].radius / 2"
            :transform="`rotate(${180 * shipState.ships[1].angleRadians / pi}, ${shipState.ships[1].positionX}, ${shipState.ships[1].positionY})`"
            fill="url(#grad1)" />
        <circle v-if="shipState.ships[1].afterburnerOn && shipState.ships[1].fuel > 0" class="ship2Afterburner"
            :cx="shipState.ships[1].positionX - shipState.ships[1].radius" :cy="shipState.ships[1].positionY"
            :r="2 * shipState.ships[1].radius / 3"
            :transform="`rotate(${180 * shipState.ships[1].angleRadians / pi}, ${shipState.ships[1].positionX}, ${shipState.ships[1].positionY})`"
            fill="url(#grad1)" />
        <circle class="ship2" :cx="shipState.ships[1].positionX" :cy="shipState.ships[1].positionY"
            :r="shipState.ships[1].radius"
            :transform="`rotate(${180 * shipState.ships[1].angleRadians / pi}, ${shipState.ships[1].positionX}, ${shipState.ships[1].positionY})`"
            fill="url(#grad2)" />
    </g>
</template>