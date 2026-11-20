interface Settings {
  white: Players;
  black: Players;
}

interface NotationFormat {
  white: Array<string>;
  black: Array<string>;
}

// Default settings
export const defaultSettings: Settings = Object.freeze({
  white: "player",
  black: "hard",
} as const);

const notation: NotationFormat = {
  white: [],
  black: [],
};

const settings: Settings = {
  white: defaultSettings.white,
  black: defaultSettings.black,
};

export function addMove(side: Sides, move: string) {
  if (side === "black" && notation[side].length + 1 !== notation.white.length) {
    console.error("It is not black's turn to move.");
  } else if (side === "white" && notation[side].length !== notation.black.length) {
    console.error("It is not white's turn to move.");
  } else {
    notation[side].push(move);
  }
}

export function resetNotation() {
  notation.white = [];
  notation.black = [];
}

export function setSettings(side: Sides, player: Players): void {
  settings[side] = player;
}

export function getSettings(side: Sides): Players {
  return settings[side];
}
