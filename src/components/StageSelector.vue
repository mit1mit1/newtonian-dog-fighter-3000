<script lang="ts">
import { defineComponent } from "vue";
import MusicControl from "@/gameMusic/MusicControl.vue";
import type { Stage } from "@/types";
import { gameState } from "@/state/gameState";


export default defineComponent({

    data() {

        return {
            gameState
        }
    },


    methods: {
        pickStage(stage: Stage | "random") {
            gameState.stage = stage
        }
    },

    components: {
        MusicControl,
    }

});
</script>


<template>
    Stage:
    <select @input="(event: any) => pickStage(event.target.value)" name="stagePicker" id="stagePicker">
        <option value="random">Random</option>
        <option value="battlefield">Battlefield</option>
        <option value="finalDestination">Final Destination</option>
        <option value="pokemonStadium">Pokemon Stadium</option>
        <option value="milkyWay">Milky Way</option>
        <option value="maw">Maw</option>
        <option value="kongoFalls">Kongo Falls</option>
        <option value="freefall">Freefall</option>
        <option value="junkyard">Junkyard</option>
        <option value="pinball">Pinball</option>
        <option value="newtonsCanons">Newton's Cannons</option>
        <option value="raceCourseOne">Race Course One</option>
        <option value="sol">Sol</option>
        <option value="blender">Blender</option>
    </select>
</template>