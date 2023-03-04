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
        :fill="`rgb(${densityColorMultiplier({ radius, mass }, 93)}, ${densityColorMultiplier({ radius, mass }, 137)}, ${densityColorMultiplier({ radius, mass }, 201)})`" />
</template>