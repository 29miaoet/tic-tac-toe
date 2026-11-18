import { useGame } from "./GameContext";

export function Notation() {
  const { rows } = useGame();

  return (
    <table>
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
