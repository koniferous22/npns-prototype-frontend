import React from 'react'

const BoostHistory = props => {
	const keys = Object.keys(props.boosts)
	return (
		<div>
			<b>Boost History</b>
			{keys.map((k, i) => (
				<ul key={i} >{props.boosts[k].boost_value.toFixed(2) + ' €'} boost by {props.boosts[k].username} on {new Date(props.boosts[k].timestamp).toGMTString()}</ul>
			))}
		</div>
	)
}

export default BoostHistory
