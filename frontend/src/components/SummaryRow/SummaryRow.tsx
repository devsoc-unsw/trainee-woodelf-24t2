type SummaryType = "guesses" | "time" | "building"; 

interface SummaryRowProps {
    summaryType: SummaryType;
    summaryAttribute: number;
}

function SummaryRow(props : SummaryRowProps) {
 
    return(
    <tr>
        <td>
            {props.summaryType === "guesses" ? (
                <span className="light-text">✅ Correct guesses</span>
            ) : props.summaryType == "building" ? (
                <span className="light-text">🏫 Correct building</span>
            ) : props.summaryType == "time" ? (
                <span className="light-text">⏰ Time bonus</span>
            ) : (
                <p>Error</p>
            )}
        </td>
        <td>
            {props.summaryAttribute}
        </td>
    </tr>
    )
}

export default SummaryRow