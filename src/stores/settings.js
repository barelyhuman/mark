import { effect, reactive } from "vue";
import { loadSettings, updateSettings } from "../lib/settings";

export const settings = reactive({
  value: loadSettings(),
});

effect(() => {
  const currentState = {};
  Object.keys(settings.value).forEach((k) => {
    currentState[k] = settings.value[k];
  });
  updateSettings(currentState);
});
