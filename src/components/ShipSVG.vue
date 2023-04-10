<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        positionX: {
            type: Number,
            default: 0,
        },
        positionY: {
            type: Number,
            default: 0,
        },
        radius: {
            type: Number,
            default: 1,
        },
        fuel: {
            type: Number,
            default: 0,
        },
        angleRadians: {
            type: Number,
            default: 0,
        },
        rearEngineOn: {
            type: Boolean,
            default: false,
        },
        afterburnerOn: {
            type: Boolean,
            default: false,
        },
        baseColor: {
            type: String,
            default: "#abc",
        },
        secondaryColor: {
            type: String,
            default: "#fed",
        },
    },
},);
</script>

<template>
    <circle v-if="rearEngineOn && fuel > 0" class="ship1Burner" :cx="positionX - radius" :cy="positionY" :r="radius / 2"
        :transform="`rotate(${180 * angleRadians / Math.PI}, ${positionX}, ${positionY})`" :fill="secondaryColor" />
    <circle v-if="afterburnerOn && fuel > 0" class="ship1Afterburner" :cx="positionX - radius" :cy="positionY"
        :r="2 * radius / 3" :transform="`rotate(${180 * angleRadians / Math.PI}, ${positionX}, ${positionY})`"
        :fill="secondaryColor" />
    <circle class="ship1" :cx="positionX" :cy="positionY" :r="radius"
        :transform="`rotate(${180 * angleRadians / Math.PI}, ${positionX}, ${positionY})`" :fill="baseColor" />
</template>