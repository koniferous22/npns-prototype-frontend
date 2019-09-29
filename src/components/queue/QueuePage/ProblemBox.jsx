import React from 'react';
import { Link } from 'react-router-dom'

export const ProblemBox = (props) => (
	<Link to={{pathname: "/problem/" + props.id, id: props.id}}>{props.title}</Link>
)
