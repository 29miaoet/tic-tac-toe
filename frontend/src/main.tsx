import { createRoot } from "react-dom/client";
import { Board } from "./Board";
import { Sidebar } from "./Sidebar";
import { Player } from "./Player";
import { Finish } from "./Finish";
import { Notation } from "./Notation";
import { defaultSettings } from "./settings";
import "./styles.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <>
    <main id="board-container">
      <Board />
    </main>
    <Finish />

    <Sidebar>
      <h1>Tic Tac Toe</h1>
      <div id="player-container">
        <Player label="White (X)" value="white" defaultPlayer={defaultSettings.white} />
        <Player label="Black (O)" value="black" defaultPlayer={defaultSettings.black} />
      </div>
      <Notation />
    </Sidebar>
  </>
);
