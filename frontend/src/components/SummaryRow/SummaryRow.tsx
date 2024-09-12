type SummaryType = "score" | "time" | "building";

interface SummaryRowProps {
  summaryType: SummaryType;
  summaryAttribute: number;
}

const summaries = {
  score: "💯 Score",
  time: "⏰ Time bonus",
  building: "🏫 Correct building",
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
