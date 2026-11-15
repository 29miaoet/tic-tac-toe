import { createRoot } from "react-dom/client";
import { Board } from "./Board";
import { Sidebar } from "./Sidebar";
import { Player } from "./Player";
import { Finish } from "./Finish";
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
      <Player label="White (X)" value="white" defaultPlayer={defaultSettings.white} />
      <Player label="Black (O)" value="black" defaultPlayer={defaultSettings.black} />
    </Sidebar>
  </>
);
