
import { useState, useEffect } from 'react';
import classes from './Summary.module.css';
import SummaryRows from '../SummaryRows/SummaryRows';
import Confetti from 'react-confetti'

interface Summary {
  correctGuesses: number;
  correctBuilding: number;
  timeBonus: number;
  shirtsAcquried: number;
}

function Summary(props: Summary) {
  // const { innerWidth: width, innerHeight: height } = window;

  const [width, setWidth]   = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  
  return (
    <div className={classes.container}>
            <Confetti
            width={width}
            height={height}
            colors={['#EFD104']}
            numberOfPieces={1000}
          />
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
