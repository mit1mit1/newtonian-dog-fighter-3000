<script lang="ts">
import { defineComponent } from "vue";
// import MusicSelector from "@/components/MusicSelector.vue";
import StageSelector from "@/components/StageSelector.vue";
import { spaceState } from "@/state/spaceState";
import { setupStage } from "@/utils/setupStage";
import { gameState, togglePause } from "@/state/gameState";
import { shipState } from "@/state/shipState";

let selectedPage = 1;

const modalTitles = ["Controls", "Game settings"
    // , "Music settings"
];

const pages = modalTitles.length;

export default defineComponent({

    data() {
        return {
            gameState, spaceState, selectedPage, pages, modalTitles, shipState
        }
    },


    methods: {
        handleFinished() {
            if (!spaceState.isStarted) {
                setupStage(gameState.stage, spaceState.gameMode === "race")
                spaceState.isStarted = true;
            }
            togglePause();
        },
    },

    components: {
        // MusicSelector,
        StageSelector,
    }

});
</script>

<template>
    <div v-if="gameState.isPaused">
        <div class="greyBackground" :onclick="handleFinished"></div>
        <div class="visibleModal">
            <div class="modalContent" @keyup.esc="handleFinished" tabindex="0">
                <button class="modalCloseButton modal-button" :onclick="handleFinished">x</button>
                <h2 class="modalTitle">{{ modalTitles[selectedPage] }}</h2>
                <div class="contentBody">
                    <button class="page-selector page-selector-left modal-button" :onclick="() => {
                        selectedPage--; if (selectedPage < 0) selectedPage += pages
                    }">&lt;</button>
                    <div :class="selectedPage % pages === 0 ? 'visiblePage' : 'hiddenPage'">
                        <div class="modalBody">
                            <div class="controlsBlock">
                                <h3 class="controls-header">Player 1:</h3>
                                <div class="controlRow"><span class="label-small">W:</span> standard thruster</div>
                                <div class="controlRow"><span class="label-small">A, D:</span> rotational thrusters</div>
                                <div class="controlRow"><span class="label-small">S:</span> afterburner</div>
                                <div class="controlRow"><span class="label-small">Q:</span> expand</div>
                                <div class="controlRow"><span class="label-small">E:</span> cloak</div>
                            </div>
                            <div class="controlsBlock">
                                <h3 class="controls-header">Player 2:</h3>
                                <div class="controlRow"><span class="label-small">I:</span> standard thruster</div>
                                <div class="controlRow"><span class="label-small">J, L:</span> rotational thrusters</div>
                                <div class="controlRow"><span class="label-small">K:</span> afterburner</div>
                                <div class="controlRow"><span class="label-small">U:</span> expand</div>
                                <div class="controlRow"><span class="label-small">O:</span> cloak</div>
                            </div>
                        </div>
                    </div>
                    <div :class="selectedPage % pages === 1 ? 'visiblePage' : 'hiddenPage'">
                        <div class="control">
                            <StageSelector />
                        </div>
                        <div class="control">
                            <div class="label-large">
                                Players:
                            </div>
                            <button :class="`radioButton ${shipState.numberOfPlayers === 0 ? 'selectedRadioButton' : ''}`"
                                :onclick="() => shipState.numberOfPlayers = 0">0</button>
                            <button :class="`radioButton  ${shipState.numberOfPlayers === 1 ? 'selectedRadioButton' : ''}`"
                                :onclick="() => shipState.numberOfPlayers = 1">1
                            </button>
                            <button :class="`radioButton  ${shipState.numberOfPlayers === 2 ? 'selectedRadioButton' : ''}`"
                                :onclick="() => shipState.numberOfPlayers = 2">2
                        </button>
                    </div>
                        <div class="control">
                            <div class="label-large">
                                Camera mode:
                            </div>
                            <button
                                :class="`radioButton  ${spaceState.cameraMode === 'fixed' ? 'selectedRadioButton' : ''}`"
                                :onclick="() => spaceState.setCameraMode('fixed')">Fixed
                            </button>
                            <button :class="`radioButton  ${spaceState.cameraMode === 0 ? 'selectedRadioButton' : ''}`"
                                :onclick="() => spaceState.setCameraMode(0)">Track Player 1
                            </button>
                            <button :class="`radioButton  ${spaceState.cameraMode === 1 ? 'selectedRadioButton' : ''}`"
                                :onclick="() => spaceState.setCameraMode(1)">Track Player 2
                            </button>
                        </div>
                        <div class="control">
                            <div class="label-large">
                                Zoom:
                            </div>
                            <button :class="`radioButton  ${spaceState.autoZoom === true ? 'selectedRadioButton' : ''}`"
                                :onclick="() => spaceState.autoZoom = true">Auto
                            </button>
                            <button :class="`radioButton  ${spaceState.autoZoom === false ? 'selectedRadioButton' : ''}`"
                                :onclick="() => spaceState.autoZoom = false">Fixed
                            </button>
                        </div>
                        <div class="control">
                            <div class="label-large">
                                Game mode:
                            </div>
                            <button :class="`radioButton  ${spaceState.gameMode === 'race' ? 'selectedRadioButton' : ''}`"
                                :onclick="() => spaceState.setGameMode('race')">Race
                            </button>
                            <button :class="`radioButton  ${spaceState.gameMode === 'battle' ? 'selectedRadioButton' : ''}`"
                                :onclick="() => spaceState.setGameMode('battle')">Battle
                            </button>
                        </div>
                    </div>
                    <!-- <div :class="selectedPage % pages === 2 ? 'visiblePage' : 'hiddenPage'">
                                            <MusicSelector />
                                        </div> -->
                    <button class="page-selector page-selector-right modal-button" :onclick="() => {
                        selectedPage++; if (selectedPage >= pages) selectedPage -= pages
                    }">></button>
                </div>
                <div class="start-button">
                    <button class="modal-button" :onclick="handleFinished">New Game</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.radioButton {
    display: inline-block;
    transition-duration: 0.4s;
    border: none;
    padding: 4px 12px;
    min-width: 40px;
    font-size: 0.95em;
    text-align: center;
    font-family: "Quicksand", sans-serif;
    border-radius: 2px;
    margin-right: 4px;
    color: black;
}

.radioButton:hover {
    background-color: #d6d6d6;
    cursor: pointer;
}

.radioButton.selectedRadioButton {
    background-color: #9e9e9e;
}

.modal-button.page-selector {
    height: 100%;
}

.contentBody {
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: 200px;
    margin-bottom: 20px;
}

.hiddenPage {
    display: none;
}

.control {
    margin-bottom: 10px;
}

.controls-header {
    margin-top: 0px;
    margin-bottom: 10px;
    font-size: 1em;
}

.controlRow {
    margin-bottom: 5px;
}

.modalBody {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.visiblePage {
    flex-grow: 4;
    margin-left: 10px;
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
    max-width: 800px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    font-family: Quicksand;
}

.label-large {
    min-width: 7.3em;
    display: inline-block;
}

.label-small {
    min-width: 2.3em;
    display: inline-block;
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
    padding: 20px 20px 25px 20px;
    min-height: 150px;
    overflow: auto;
    min-height: 150px;
    padding-bottom: 20px;
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
    top: 0px;
    right: 0px;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}


.modal-button {
    transition-duration: 0.4s;
    border: none;
    padding: 8px 12px;
    min-height: 40px;
    font-size: 0.95em;
    font-family: "Quicksand", sans-serif;
    color: black;
}

.modal-button:hover {
    background-color: #d6d6d6;
    cursor: pointer;
}
</style>