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
}

function Summary(props: SummaryProps) {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti className={classes.confetti} width={width} height={height} />
      <div className={classes.container}>
        <h1 className={classes.title}>Summary</h1>
        <hr></hr>
        <div>
          <table className={classes.fields}>
            <tbody>
              <SummaryRow
                summaryType="score"
                summaryAttribute={props.totalScore}
              />
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
    </>
  );
}

export default Summary;
