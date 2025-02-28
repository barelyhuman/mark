const KEY = "mark:settings";

const settings = {};

export const loadSettings = () => {
  const _settings = localStorage.getItem(KEY) || "{}";
  try {
    Object.assign(settings, JSON.parse(_settings));
  } catch (err) {
    Object.assign(settings, {});
  }
  return settings;
};

export const saveSettings = () => {
  localStorage.setItem(KEY, JSON.stringify(settings));
};

export const updateSettings = (patch) => {
  Object.assign(settings, patch);
  saveSettings();
};
