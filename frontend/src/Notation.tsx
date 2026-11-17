import { useState } from "react";

interface TableRow {
  white: string;
  black: string;
}

export function Notation() {
  const [rows, setRows] = useState<TableRow[]>([{ white: "", black: "" }]);

  function recordMove(move: string) {
    setRows((prevRows) => {
      const lastRow = prevRows[prevRows.length - 1];

      if (!lastRow.white) {
        const updated = [...prevRows];
        updated[updated.length - 1] = { ...lastRow, white: move };
        return updated;
      }

      if (!lastRow.black) {
        const updated = [...prevRows];
        updated[updated.length - 1] = { ...lastRow, black: move };
        return updated;
      }

      return [...prevRows, { white: move, black: "" }];
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Turn</th>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{row.white}</td>
              <td>{row.black}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
