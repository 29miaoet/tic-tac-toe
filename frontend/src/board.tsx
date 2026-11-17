import { useState } from "react";
import { getSettings } from "./settings";
import { finish } from "./Finish";
import createModule from "../../wasm/TicTacToe.js";
import wasmUrl from "../../wasm/TicTacToe.wasm?url";

const wasm = await createModule({
  locateFile(path: string, prefix: string) {
    return path.endsWith(".wasm") ? wasmUrl : prefix + path;
  },
});

const game = new wasm.ComputerAided();

type Move = [number, number];
type PlayReturn = [Move, "X" | "O"];

export function getBoard() {
  return game.getBoard();
}

function* play(xcoord: number, ycoord: number): Generator<PlayReturn, void, unknown> {
  const turn = game.getTurn();
  // Safe default
  let player: string = "player";
  let otherPlayer: string = "player";

  if (turn == 1) {
    player = getSettings("white");
    otherPlayer = getSettings("black");
  } else if (turn == -1) {
    player = getSettings("black");
    otherPlayer = getSettings("white");
  }

  let lastMove: Move;

  switch (player) {
    case "player":
      lastMove = [xcoord, ycoord];
      game.move(...lastMove);
      break;
    case "hard":
      lastMove = game.getBestMove(turn == 1, 0, 10).move;
      game.move(...lastMove);
      break;
    case "medium":
      lastMove = game.getReasonableMove(turn == 1);
      game.move(...lastMove);
      break;
    case "easy":
      lastMove = game.getRandomMove();
      game.move(...lastMove);
      break;
    default:
      throw new TypeError("Unable to read preferred player.");
  }

  yield [lastMove, turn == 1 ? "X" : "O"];

  const currentWinner = game.winner();
  if (currentWinner !== 0 || game.getAllMoves().size() === 0) {
    switch (currentWinner) {
      case 1:
        finish("Game Over", "White Won");
        break;
      case -1:
        finish("Game Over", "Black Won");
        break;
      case 0:
        finish("Game Over", "Draw");
        break;
    }
    return;
  }

  if (otherPlayer !== "player") {
    yield* play(0, 0);
  }
}

export function Board() {
  const [cells, setCells] = useState<Array<string>>(Array(9).fill(""));

  function makeMove(xcoord: number, ycoord: number) {
    const generator = play(xcoord, ycoord);

    for (let result = generator.next(); !result.done; result = generator.next()) {
      const [lastMove, lastSymbol] = result.value;

      setCells((prev) => {
        const updated = [...prev];
        updated[lastMove[0] * 3 + lastMove[1]] = lastSymbol;
        return updated;
      });
    }
  }

  return (
    <div id="board">
      {cells.map((cell, index) => (
        <button
          className="cell"
          key={index}
          onClick={() => makeMove(Math.floor(index / 3), index % 3)}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
