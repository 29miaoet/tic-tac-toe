type Players = "player" | "hard" | "medium" | "easy";

interface Settings {
  white: Players;
  black: Players;
}

export const settings = {
  white: "easy",
  black: "hard",
};
