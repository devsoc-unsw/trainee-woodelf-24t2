type SummaryType = "score" | "time" | "personalRecord" | "newHighScore" | "newCumulativeScore";

interface SummaryRowProps {
  summaryType: SummaryType;
  summaryAttribute: number;
}

const summaries = {
  score: "💯 Score",
  time: "⏰ Time bonus",
  personalRecord: "📜 Personal Best:",
  newHighScore: "🏆 New High Score!",
  newCumulativeScore: "⭐ Total Score",
};

function SummaryRow(props: SummaryRowProps) {
  return (
    <tr>
      <td className="light-text">{summaries[props.summaryType]}</td>
      <td>{props.summaryAttribute}</td>
    </tr>
  );
}

export default SummaryRow;
