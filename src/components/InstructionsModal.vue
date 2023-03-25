<script lang="ts">
import { defineComponent } from "vue";
import MusicControl from "@/gameMusic/MusicControl.vue";
import { spaceState } from "@/state/spaceState";
import { setupStage } from "@/utils/setupStage";
import type { Stage } from "@/types";
let displayModal = true;

let stage: Stage | "random" = "random";

export default defineComponent({

    data() {
        return {
            displayModal, stage, spaceState
        }
    },


    methods: {
        handleFinished() {
            this.displayModal = false;
            setupStage(this.stage, spaceState.numberOfPlayers, spaceState.gameMode === "race")

            setTimeout(() => {
                spaceState.setIsStarted(true);
            }, 500)
        },
        pickStage(stage: Stage | "random") {
            this.stage = stage
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
                <div class="modalBody">
                    <div class="controlsBlock">
                        <h3 class="controls-header">Player 1:</h3>
                        <div><span class="label-small">W:</span> standard thruster</div>
                        <div><span class="label-small">A, D:</span> rotational thrusters</div>
                        <div><span class="label-small">S:</span> afterburner</div>
                        <div><span class="label-small">Q:</span> expand</div>
                        <div><span class="label-small">E:</span> cloak</div>
                    </div>
                    <div class="controlsBlock">
                        <h3 class="controls-header">Player 2:</h3>
                        <div><span class="label-small">I:</span> standard thruster</div>
                        <div><span class="label-small">J, L:</span> rotational thrusters</div>
                        <div><span class="label-small">K:</span> afterburner</div>
                        <div><span class="label-small">U:</span> expand</div>
                        <div><span class="label-small">O:</span> cloak</div>
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
                                <option value="raceCourseOne">Race Course One</option>
                                <option value="sol">Sol</option>
                            </select>
                        </div>
                        <div class="control">
                            Players:
                            <select @input="(event: any) => spaceState.setNumberOfPlayers(event.target.value)"
                                name="numberOfPlayers" id="numberOfPlayers">
                                <option value="0">0</option>
                                <option selected value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div v-if="spaceState.numberOfPlayers == 1" class="control">
                            Camera mode:
                            <select @input="(event: any) => spaceState.setCameraMode(event.target.value)" name="cameraMode"
                                id="cameraMode">
                                <option value="fixed">Fixed</option>
                                <option selected value="0">Track Player 1</option>
                            </select>
                        </div>
                        <div v-if="spaceState.numberOfPlayers == 1" class="control">
                            Game mode:
                            <select @input="(event: any) => spaceState.setGameMode(event.target.value)" name="gameMode"
                                id="gameMode">
                                <option value="race">Race</option>
                                <option value="battle">Battle</option>
                            </select>
                        </div>
                        <div v-if="spaceState.numberOfPlayers == 1" class="control">
                            Zoom:
                            <select @input="(event: any) => spaceState.setZoom(event.target.value)" name="zoom" id="zoom">
                                <option value="-1">-1</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                        </div>
                        <MusicControl />
                    </div>
                </div>
                <div class="start-button">
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

.controls-header {
    margin-top: 0px;
    margin-bottom: 10px;
    font-size: 1em;
}

.modalBody {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

@media (max-width: 500px) {
    .modalBody {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
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
    font-family: Quicksand;
}

.label-small {
    min-width: 3em;
    display: inline-block;
    text-align: center;
    font-weight: bold;
}

@media screen and ((max-height: 480px) or (max-width: 480px)) {
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
    min-height: 150px;
    overflow: auto;
    min-height: 150px;
    padding-bottom: 50px;
    position: relative;
}

.modalTitle {
    margin-top: 0;
    text-align: left;
    font-family: 'Indie Flower';
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
    right: 0px;
    min-width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

@media screen and ((max-height: 480px) or (max-width: 480px)) {
    .start-button {
        position: absolute;
        bottom: 25px;
    }
}
</style>