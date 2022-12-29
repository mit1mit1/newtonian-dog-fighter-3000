<script lang="ts">
import { defineComponent } from "vue";
import MusicControl from "@/gameMusic/MusicControl.vue";
import { spaceState } from "@/state/spaceState";
import { setupStage } from "@/utils/setupStage";
import type { NumberOfPlayers, Stage } from "@/types";
let displayModal = true;

let stage: Stage | "random" = "random";
let numberOfPlayers: NumberOfPlayers = 2;

export default defineComponent({

    data() {
        return {
            displayModal, stage, numberOfPlayers
        }
    },


    methods: {
        handleFinished() {
            this.displayModal = false;
            setupStage(this.stage, this.numberOfPlayers)

            setTimeout(() => {
                spaceState.setIsStarted(true);
            }, 500)
        },
        pickStage(stage: Stage | "random") {
            this.stage = stage
        },
        setNumberOfPlayers(numberOfPlayers: NumberOfPlayers) {
            this.numberOfPlayers = numberOfPlayers
        }
    },

    components: {
        MusicControl,
    }

});
</script>

<template>
    <div v-if="displayModal">
        <div class="greyBackground" :onclick="handleFinished"></div>
        <div class="visibleModal">
            <div class="modalContent" @keyup.esc="handleFinished" tabindex="0">
                <button class="modalCloseButton napoleonic-button" :onclick="handleFinished">x</button>
                <h2 class="modalTitle">Welcome to the arena</h2>
                <div class="controlsBlock">
                    Player 1 controls:
                    <ul>
                        <li>W: standard thruster</li>
                        <li>A, D: rotational thrusters</li>
                        <li>S: afterburner</li>
                        <li>Q: expand</li>
                        <li>E: cloak</li>
                    </ul>
                </div>
                <div class="controlsBlock">
                    Player 2 controls:
                    <ul>
                        <li>I: standard thruster</li>
                        <li>J, L: rotational thrusters</li>
                        <li>K: afterburner</li>
                        <li>U: expand</li>
                        <li>O: cloak</li>
                    </ul>
                </div>
                <div class="controlsBlock">
                    <div class="control">
                        Stage:
                        <select @input="(event: any) => pickStage(event.target.value)" name="stagePicker"
                            id="stagePicker">
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
                        </select>
                    </div>
                    <div class="control">
                        Players:
                        <select @input="(event: any) => setNumberOfPlayers(event.target.value)" name="numberOfPlayers"
                            id="numberOfPlayers">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option selected value="2">2</option>
                        </select>
                    </div>
                    <MusicControl />
                </div>
                <div class="control">
                    <button class="napoleonic-button" :onclick="handleFinished">Start Game</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.control {
    margin-bottom: 10px;
}

.textBlock {
    display: inline;
    text-align: center;
    height: 100%;
    font-family: 'Quicksand';
    vertical-align: top;
}

.visibleModal {
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
    align-items: center;
    justify-content: center;
    max-width: 1080px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}

@media screen and (max-height: 480px) {
    .visibleModal {
        height: -webkit-fill-available;
    }
}

.controlsBlock {
    display: inline-block;
    margin-right: 100px;
}

.modalContent {
    width: 90%;
    background-color: #fff;
    color: #212121;
    padding: 20px 30px 25px 30px;
    height: inherit;
    overflow: auto;
    min-height: 150px;
    padding-bottom: 50px;
}

.modalTitle {
    margin-top: 0;
    text-align: left;
}

.invisibleModal {
    display: none;
}

.greyBackground {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -50px;
    top: 0;
    background-color: #ffffff90;
}

.modalCloseButton {
    position: absolute;
    top: 5px;
    right: 50px;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>