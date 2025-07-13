import classes from "./Summary.module.scss";
import SummaryRow from "../SummaryRow/SummaryRow";
import { useWindowSize } from "@reactuses/core";
import Confetti from "react-confetti";

interface SummaryProps {
  totalScore: number;
  // personalBest: number;
  handleClick: () => void;
  // timeBonus: number;
  // shirtsAcquried: number;
  newHighScore?: number;
  newCumulativeScore?: number;
  newLevel?: number;
  previousLevel?: number;
  levelsEarned?: number;
}

function Summary(props: SummaryProps) {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height} />
      <div className={classes.container}>
        <div className={classes.summaryBox}>
          <h1 className={classes.title}>Summary</h1>
          <hr></hr>
          <div>
            <table className={classes.fields}>
              <tbody>
                <SummaryRow
                  summaryType="score"
                  summaryAttribute={props.totalScore}
                />
                {props.newHighScore !== undefined && (
                  <SummaryRow
                    summaryType="newHighScore"
                    summaryAttribute={props.newHighScore}
                  />
                )}
                {props.newCumulativeScore !== undefined && (
                  <SummaryRow
                    summaryType="newCumulativeScore"
                    summaryAttribute={props.newCumulativeScore}
                  />
                )}
                {props.newLevel !== undefined && (
                  <tr>
                    <td className="light-text">⭐ Level</td>
                    <td>{props.newLevel}</td>
                  </tr>
                )}
                {props.levelsEarned !== undefined && props.levelsEarned > 0 && (
                  <tr>
                    <td className="light-text">🎉 New Levels Earned!</td>
                    <td>+{props.levelsEarned}</td>
                  </tr>
                )}
                {/* <SummaryRow
              summaryType="personalRecord"
              summaryAttribute={props.personalBest}
            /> */}
                {/* <SummaryRow summaryType="time" summaryAttribute={props.timeBonus} /> */}
              </tbody>
            </table>
          </div>
          {/* <div className={classes.result}>
        💃🥳 {props.shirtsAcquried} Shirts acquired 💃🥳
      </div> */}
          <br />
          <button className={classes.button} onClick={props.handleClick}>
            Good job!
          </button>
        </div>
      </div>
    </>
  );
}

export default Summary;
