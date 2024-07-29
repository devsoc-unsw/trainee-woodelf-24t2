import classes from './Summary.module.css';
import SummaryRow from '../SummaryRow/SummaryRow';

interface SummaryProps {
  correctGuesses: number;
  correctBuilding: number;
  timeBonus: number;
  shirtsAcquried: number;
}

function Summary(props: SummaryProps) {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Summary</h1>
      <hr></hr>
      <div>
        <table className={classes.fields}>
          <tbody>
            <SummaryRow
              summaryType="guesses"
              summaryAttribute={props.correctGuesses}
            />
            <SummaryRow
              summaryType="building"
              summaryAttribute={props.correctBuilding}
            />
            <SummaryRow
              summaryType="time"
              summaryAttribute={props.timeBonus}
            />
          </tbody>
        </table>
      </div>
      <div className={classes.result}>
        💃🥳 {props.shirtsAcquried} Shirts acquired 💃🥳
      </div>
      <button className={classes.button}>Good job!</button>
    </div>
  );
}

export default Summary;
