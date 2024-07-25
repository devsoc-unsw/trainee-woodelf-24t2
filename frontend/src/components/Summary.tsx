import classes from './Summary.module.css'
import { useEffect } from 'react'

interface Summary {
	correctGuesses: number;
	correctBuilding: number;
	timeBonus: number;
	shirtsAcquried: number;
}

function Summary(props: Summary) {

	return(
		<div className={classes.container}>
			<div className={classes.title}>
				Summary
			</div>
				<hr></hr>
			<div className={classes.table}>
				<ul className={classes.fields}>
					<li>
						<span className='light-text'>✅ Correct Guesses:</span> {props.correctGuesses}
					</li>
					<li>
						<span className='light-text'>🏫 Correct Building:</span> {props.correctBuilding}
					</li>
					<li>
						<span className='light-text'>⏰ Time Bonus:</span> {props.timeBonus}
					</li>
				</ul>
			</div>
			<div className={classes.result}>
			💃🥳	{props.shirtsAcquried} Shirts Acquired 💃🥳
			</div>
			<button className={classes.button}>
				Good job!
			</button>
		</div>
	)
}

export default Summary