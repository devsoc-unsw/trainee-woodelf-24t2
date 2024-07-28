import classes from './Summary.module.css';
import SummaryRows from '../SummaryRows/SummaryRows';

interface Summary {
  correctGuesses: number;
  correctBuilding: number;
  timeBonus: number;
  shirtsAcquried: number;
}

function Summary(props: Summary) {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Summary</h1>
      <hr></hr>
      <div>
        <table className={classes.fields}>
          <tbody>
          <SummaryRows
              summaryType="guesses"
              summaryAttribute={props.correctGuesses}
            />
            <SummaryRows
              summaryType="building"
              summaryAttribute={props.correctBuilding}
            />
            <SummaryRows
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
