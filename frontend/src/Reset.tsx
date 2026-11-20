import { useGame } from "./GameContext";

export function Reset() {
  const { clearBoard } = useGame();

  return (
    <button onClick={clearBoard} id="reset-button">
      New Game
    </button>
  );
}
