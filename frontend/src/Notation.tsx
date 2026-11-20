import { useGame } from "./GameContext";

export function Notation() {
  const { rows } = useGame();

  return (
    <table className="notation">
      <thead>
        <tr>
          <th>Move</th>
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
  );
}
