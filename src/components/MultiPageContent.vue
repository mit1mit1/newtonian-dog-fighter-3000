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

</template>