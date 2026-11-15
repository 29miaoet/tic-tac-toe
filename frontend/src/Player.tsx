import { useState } from "react";
import { setSettings } from "./settings";

interface PlayerOptions {
  value: Players;
  label: string;
}

interface PlayerProps {
  label: string;
  defaultPlayer: Players;
  value: Sides;
}

type PlayerDropdown = [PlayerOptions, PlayerOptions, PlayerOptions, PlayerOptions];

const players: PlayerDropdown = [
  { value: "easy", label: "AI: easy" },
  { value: "medium", label: "AI: medium" },
  { value: "hard", label: "AI: hard" },
  { value: "player", label: "Player" },
];

export function Player({ label, defaultPlayer, value }: PlayerProps) {
  const [selected, setSelected] = useState<Players>(defaultPlayer);

  function setPlayer(playerValue: Players) {
    setSelected(playerValue);
    setSettings(value, playerValue);
  }

  return (
    <label>
      {label}
      <select value={selected} onChange={(event) => setPlayer(event.target.value as Players)}>
        {players.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
