type SummaryType = 'guesses' | 'time' | 'building';

interface SummaryRowProps {
  summaryType: SummaryType;
  summaryAttribute: number;
}

const summaries = {
  guesses: '🎯 Correct guesses',
  time: '⏰ Time bonus',
  building: '🏫 Correct building',
};

function SummaryRow(props: SummaryRowProps) {
  return (
    <tr>
      <td>{summaries[props.summaryType]}</td>
      <td>{props.summaryAttribute}</td>
    </tr>
  );
}

export default SummaryRow;
