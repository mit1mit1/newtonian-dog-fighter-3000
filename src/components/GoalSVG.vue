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
    <circle class="goalSVG" :cx="positionX" :cy="positionY" :r="radius" fill="transparent" stroke-width="4"
        :stroke="shipState.ships[0].nextGoal === index ? `yellow` : `green`" />
    <text fill="white" stroke="white" class="goalText" :x="(positionX ?? 0) - 13" :y="(positionY ?? 0) + 13">{{ index
    }}</text>
</template>

<style>
.goalText {
    font-size: 40px;
    text-align: center;
}
</style>