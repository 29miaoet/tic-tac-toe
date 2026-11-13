import { useState } from "react";

export default function Board() {
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));

  function handleClick(index: number) {
    if (cells[index] !== "") return;

    const updated = [...cells];
    updated[index] = "X";

    setCells(updated);
  }

  return (
    <div className="board">
      {cells.map((cell, index) => (
        <button className="cell" key={index} onClick={() => handleClick(index)}>
          {cell}
        </button>
      ))}
    </div>
  );
}
