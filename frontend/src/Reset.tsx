import { useGame } from "./GameContext";

export function Reset() {
  const { clearBoard } = useGame();

  return <button onClick={clearBoard}>New Game</button>;
}
