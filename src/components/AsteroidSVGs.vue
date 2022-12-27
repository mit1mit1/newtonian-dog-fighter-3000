<script lang="ts">
import { asteroids } from "@/state/asteroidState";
import { defineComponent } from "vue";

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