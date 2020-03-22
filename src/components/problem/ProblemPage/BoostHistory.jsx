import React from 'react'

const BoostHistory = ({ boosts }) => {
	const keys = Object.keys(boosts)
	return (
		<div>
			<b>Boost History</b>
			{keys.map((k, i) => (
				<ul key={i} >{boosts[k].boost_value.toFixed(2) + ' €'} boost by {boosts[k].username} on {new Date(boosts[k].timestamp).toGMTString()}</ul>
			))}
		</div>
	)
}

export default BoostHistory
