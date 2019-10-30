import React from 'react';
import { Link } from 'react-router-dom'
const TransactionBox = (props) => (
	<div>
		{props.created}<br/>
		{'Karma value: ' + props.karma_value + ' '}
		<Link to={'/q/' + props.queue}>{props.queue}</Link><br/>
		{'Monetary value: ' + props.monetary_value}<br/>
		{props.description}<br/>
	</div>	
)

export default TransactionBox