<script lang="ts">
import { maxHealth, maxFuel } from "@/constants/ships";
import { gameState } from "@/state/gameState";
import { shipState } from "@/state/shipState";
import ShipSVG from "@/components/ShipSVG.vue";
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
    components: {
        ShipSVG,
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
    <g v-if="shipState.ships.length > 0 && shipState.ships[0].health >= 0">
        <ShipSVG :positionX="shipState.ships[0].positionX" :positionY="shipState.ships[0].positionY"
            :fuel="shipState.ships[0].fuel" :afterburnerOn="shipState.ships[0].afterburnerOn"
            :rearEngineOn="shipState.ships[0].rearEngineOn" :angleRadians="shipState.ships[0].angleRadians"
            :radius="shipState.ships[0].radius" baseColor="url(#grad1)" secondaryColor="url(#grad2)" />
    </g>
    <g v-if="shipState.ships.length > 1 && shipState.ships[1].health >= 0">
        <ShipSVG :positionX="shipState.ships[1].positionX" :positionY="shipState.ships[1].positionY"
            :fuel="shipState.ships[1].fuel" :afterburnerOn="shipState.ships[1].afterburnerOn"
            :rearEngineOn="shipState.ships[1].rearEngineOn" :angleRadians="shipState.ships[1].angleRadians"
            :radius="shipState.ships[1].radius" baseColor="url(#grad2)" secondaryColor="url(#grad1)" />
    </g>
</template>