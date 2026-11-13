import createModule from "../../wasm/TicTacToe.js";
import wasmUrl from "../../wasm/TicTacToe.wasm?url";

const wasm = await createModule({
  locateFile(path: string, prefix: string) {
    return path.endsWith(".wasm") ? wasmUrl : prefix + path;
  },
});

const game = new wasm.ComputerAided(
  [
    [0, 0, 0],
    [-1, 1, 0],
    [0, 0, 0],
  ],
  1
);

while (true) {
  const best = game.getBestMove(game.getTurn() == 1, 0, 10);
  if (best.move[0] == -1 && best.move[1] == -1) {
    break;
  } else {
    const side = (() => {
      if (game.getTurn() == 1) return "white";
      else return "black";
    })();
    console.log(`${side} moves now...`);

    game.move(...best.move);

    const winner = (() => {
      if (best.score < 0) return "black wins";
      else if (best.score > 0) return "white wins";
      else return "draw";
    })();

    console.log(`Predicted result: ${winner}`);

    console.log(game.getBoard());
  }
}

// Cleanup
game.delete();
