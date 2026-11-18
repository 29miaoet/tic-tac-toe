import { createContext, useContext, useState } from "react";
import { addMove } from "./settings";

interface TableRow {
  white: string;
  black: string;
}

interface GameContextType {
  rows: TableRow[];
  recordMove: (move: string) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [rows, setRows] = useState<TableRow[]>([{ white: "", black: "" }]);

  function recordMove(move: string) {
    setRows((prevRows) => {
      const lastRow = prevRows[prevRows.length - 1];

      if (!lastRow.white) {
        const updated = [...prevRows];
        updated[updated.length - 1] = { ...lastRow, white: move };
        addMove("white", move);
        return updated;
      }

      if (!lastRow.black) {
        const updated = [...prevRows];
        updated[updated.length - 1] = { ...lastRow, black: move };
        addMove("black", move);
        return updated;
      }

      addMove("white", move);
      return [...prevRows, { white: move, black: "" }];
    });
  }

  return <GameContext.Provider value={{ rows, recordMove }}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }

  return context;
}
