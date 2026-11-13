import { createRoot } from "react-dom/client";
import Board from "./board";
import "./test";
import "./styles.css";

const root = createRoot(document.getElementById("root")!);

root.render(<Board />);
