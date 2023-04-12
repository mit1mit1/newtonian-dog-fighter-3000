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
        fill="transparent" stroke-width="4"
        :stroke="shipState.ships[0].completedGoals.includes(index ?? 0) ? `green` : `url(#grad1)`" />
    <circle v-if="shipState.ships.length > 1" class="goalSVG" :cx="positionX" :cy="positionY" :r="(radius ?? 0) - 6"
        fill="transparent" stroke-width="4"
        :stroke="shipState.ships[1].completedGoals.includes(index ?? 0) ? `green` : `url(#grad2)`" />
</template>
