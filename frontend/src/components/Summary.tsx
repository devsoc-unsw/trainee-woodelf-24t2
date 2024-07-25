import classes from './Summary.module.css'
import { useEffect } from 'react'

interface summary {
	correctGuesses: number;
	correctBuilding: number;
	timeBonus: number;
	shirtsAcquried: number;
}

function Summary(props: summary) {

	return(
			<div className={classes.container}>
				<div className={classes.table}>

				</div>
			</div>
	)
}

export default Summary