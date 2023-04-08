<script lang="ts">
import { startNewSong, setVolume, setVibe } from "../gameMusic/playMusic";
import { defineComponent } from "vue";
import VolumeSlider from "../gameMusic/VolumeSlider.vue";

export default defineComponent({
    methods: {
        startNewSong,
        setVolume,
        setVibe,
    },
    components: {
        VolumeSlider
    }
});
</script>

<template>

    <div class="music-control">
        <VolumeSlider />
        <div class="selector">
            Song: <select @input="(event: any) => setVibe(event.target.value)" name="music-vibes"
                id="music-vibes">
                <option value="">Select your option</option>
                <option value="pleasentlypicky">Picky</option>
                <option value="creepy">Creepy</option>
                <option value="bumpish">Bumpish</option>
                <option value="basicpicky">Picky (Basic)</option>
                <option value="funkypicky">Picky (Funky)</option>
                <option value="barke">Barke</option>
                <option value="fonk">Fonk</option>
            </select>
        </div>
        <button class="napoleonic-button" :onclick="startNewSong">Start new song</button>
    </div>

</template>

<style>
label {
    font-size: 0.95em;
    font-family: "Quicksand", sans-serif;

}

.selector {
    margin-bottom: 10px
}
</style>