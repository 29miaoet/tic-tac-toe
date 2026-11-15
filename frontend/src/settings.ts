interface Settings {
  white: Players;
  black: Players;
}

// Default settings
export const defaultSettings: Settings = Object.freeze({
  white: "player",
  black: "hard",
} as const);

const settings: Settings = {
  white: defaultSettings.white,
  black: defaultSettings.black,
};

export function setSettings(side: Sides, player: Players): void {
  settings[side] = player;
}

export function getSettings(side: Sides): Players {
  return settings[side];
}
