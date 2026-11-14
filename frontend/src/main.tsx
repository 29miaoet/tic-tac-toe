import { createRoot } from "react-dom/client";
import Board from "./Board";
import Sidebar from "./Sidebar";
import "./styles.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <>
    <main id="board-container">
      <Board />
    </main>

    <Sidebar />
  </>
);
