<script lang="ts">import { densityColorMultiplier } from '@/utils/physics';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        positionX: Number,
        positionY: Number,
        radius: Number,
        mass: Number
    },
    methods: {
        densityColorMultiplier
    },
},);
</script>

<template>
    <circle class="sun" :cx="positionX" :cy="positionY" :r="radius"
        :fill="`rgb(${densityColorMultiplier({ radius, mass }, 7)}, ${densityColorMultiplier({ radius, mass }, 3)}, ${densityColorMultiplier({ radius, mass }, 0.1)})`" />
</template>