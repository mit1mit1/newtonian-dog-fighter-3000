// store.js
import { reactive } from "vue";

export const spaceState = reactive<{
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
}>({
  isStarted: false,
  setIsStarted(started: boolean) {
    this.isStarted = started;
  },
});
