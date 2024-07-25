import classes from './Summary.module.css'

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
			<div>
					<table className={classes.fields}>
						<tr>
							<td>
								<span className='light-text'>✅ Correct Guesses</span>
							</td>
							<td>
								{props.correctGuesses}
							</td>
						</tr>
						<tr>
							<td>
								<span className='light-text'>🏫 Correct Building</span>
							</td>
							<td>
								{props.correctBuilding}
							</td>
						</tr>
						<tr>
							<td>
								<span className='light-text'>⏰ Time Bonus</span>
							</td>
							<td>
								{props.timeBonus}
							</td>
						</tr>
					</table>
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