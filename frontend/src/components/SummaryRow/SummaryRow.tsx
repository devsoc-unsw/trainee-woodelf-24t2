type SummaryRowProps = "guesses" | "time" | "building"; 

interface SummaryInformation {
    summaryType: SummaryRowProps;
    summaryAttribute: number;
}

function SummaryRow(props : SummaryInformation) {
 
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