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
    <circle v-if="shipState.ships.length > 0" class="goalSVG" :cx="positionX" :cy="positionY" :r="(radius ?? 0)"
        fill="transparent" stroke-width="4" :stroke="shipState.ships[0].nextGoal === index ? `url(#grad1)` : `green`" />
    <circle v-if="shipState.ships.length > 1" class="goalSVG" :cx="positionX" :cy="positionY" :r="(radius ?? 0) - 6"
        fill="transparent" stroke-width="4" :stroke="shipState.ships[1].nextGoal === index ? `url(#grad2)` : `green`" />
    <text fill="white" stroke="white" class="goalText" :x="(positionX ?? 0) - 11" :y="(positionY ?? 0) + 13">{{ index
    }}</text>
</template>

<style>
.goalText {
    font-size: 40px;
    text-align: center;
    font-family: monospace;
}
</style>