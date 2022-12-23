<script lang="ts">
import { planets } from "@/state/planetState";
import { asteroids } from "@/state/asteroidState";
import { spaceState } from "@/state/spaceState";
import { applyCollisionSpeedChange } from "@/utils/physics";
import { collisionFixX, collisionFixY, gravityAccelerationX, gravityAccelerationY, resistanceAdjustmentX, resistanceAdjustmentY } from "@/utils/physics";
import { defineComponent } from "vue";
import { frameMilliseconds } from "@/constants/physics";
import { ship1Data, ship2Data } from "@/state/shipState";

const updateAsteroidData = () => {
    if (spaceState.isStarted) {
        asteroids.forEach((asteroidData, index) => {
            [ship1Data, ship2Data].forEach((objectData) => {
                applyCollisionSpeedChange(asteroidData, objectData);
                objectData.positionX = collisionFixX(asteroidData, objectData);
                objectData.positionY = collisionFixY(asteroidData, objectData);
                asteroidData.positionX = collisionFixX(objectData, asteroidData);
                asteroidData.positionY = collisionFixY(objectData, asteroidData);
            });
            asteroids.forEach((nestedAsteroidData, nestAsteroidIndex) => {
                if (nestAsteroidIndex === index) {
                    return;
                }
                applyCollisionSpeedChange(asteroidData, nestedAsteroidData);
                nestedAsteroidData.positionX = collisionFixX(asteroidData, nestedAsteroidData);
                nestedAsteroidData.positionY = collisionFixY(asteroidData, nestedAsteroidData);
                asteroidData.positionX = collisionFixX(nestedAsteroidData, asteroidData);
                asteroidData.positionY = collisionFixY(nestedAsteroidData, asteroidData);
            });
            asteroidData.positionX = asteroidData.positionX + asteroidData.speedX;
            asteroidData.positionY = asteroidData.positionY + asteroidData.speedY;
            planets.forEach(planetData => {
                alert('yo')
                asteroidData.speedX = asteroidData.speedX + gravityAccelerationX(planetData, asteroidData);
                asteroidData.speedY = asteroidData.speedY + gravityAccelerationY(planetData, asteroidData);
                asteroidData.speedX = resistanceAdjustmentX(planetData, asteroidData);
                asteroidData.speedY = resistanceAdjustmentY(planetData, asteroidData);
            });
        })
    }

}
let t = setInterval(updateAsteroidData, frameMilliseconds);


export default defineComponent({
    data() {
        return {
            asteroids
        }
    },
});
</script>

<template>
    <g v-for="asteroid in asteroids">
        <circle class="asteroid" :cx="asteroid.positionX" :cy="asteroid.positionY" :r="asteroid.radius" fill="grey" />
    </g>
</template>