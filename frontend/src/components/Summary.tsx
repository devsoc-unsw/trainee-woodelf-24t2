import classes from './Summary.module.css';

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
            <tr>
              <td>
                <span className="light-text">✅ Correct guesses</span>
              </td>
              <td>{props.correctGuesses}</td>
            </tr>
            <tr>
              <td>
                <span className="light-text">🏫 Correct building</span>
              </td>
              <td>{props.correctBuilding}</td>
            </tr>
            <tr>
              <td>
                <span className="light-text">⏰ Time bonus</span>
              </td>
              <td>{props.timeBonus}</td>
            </tr>
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
