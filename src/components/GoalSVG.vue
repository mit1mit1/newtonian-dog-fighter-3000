<script lang="ts">
import { shipState } from '@/state/shipState';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        positionX: Number,
        positionY: Number,
        radius: Number,
        index: Number
    },
    data() {
        return {
            shipState
        }
    },
});
</script>

<template>
    <circle class="goalSVG" :cx="positionX" :cy="positionY" :r="radius" :fill="shipState.ships[0].nextGoal === index ? `yellow` : `green`" />
    <text :x="positionX" :y="positionY">{{ index }}</text>
</template>

<style>
.goalSVG {
    opacity: 0.5;
}
</style>