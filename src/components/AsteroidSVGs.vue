<script lang="ts">
import { planets } from "@/state/planetState";
import { asteroids } from "@/state/asteroidState";
import { spaceState } from "@/state/spaceState";
import { applyCollisionSpeedChange } from "@/utils/physics";
import { collisionFixX, collisionFixY, gravityAccelerationX, gravityAccelerationY, resistanceAdjustmentX, resistanceAdjustmentY } from "@/utils/physics";
import { defineComponent } from "vue";
import { frameMilliseconds } from "@/constants/physics";
import { ship1Data, ship2Data } from "@/state/shipState";

// let t = setInterval(updateAsteroidData, frameMilliseconds);


export default defineComponent({
    data() {
        return {
            asteroids
        }
    },
});
</script>

<template>
    <g v-for="asteroid in asteroids">
        <circle class="asteroid" :cx="asteroid.positionX" :cy="asteroid.positionY" :r="asteroid.radius" fill="grey" />
    </g>
</template>