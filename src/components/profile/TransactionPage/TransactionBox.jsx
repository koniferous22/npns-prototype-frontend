import React from 'react';
import { Link } from 'react-router-dom'
const TransactionBox = (props) => (
	<div>
		{new Date(props.created).toLocaleDateString()}<br/>
		<Link to={'/q/' + props.queue}>{props.queue}</Link>
		{' Karma value: ' + props.karma_value}<br/>
		{'Monetary value: ' + props.monetary_value + "$"}<br/>
		{props.description}<br/>
	</div>	
)

export default TransactionBox
