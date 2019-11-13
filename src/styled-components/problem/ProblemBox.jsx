// IMPORTANT HAVE TO REFACTOR NAMES, CUZ THIS WILL BE CONFUSED WITH PROBELM BOX ON QUEUE PAGE

import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedProblemBox = styled.div`
	border-radius: 10px;
	padding: 10px;
	h3 {
		margin-top: 0;
	}
	background-color: rgba(67, 0, 50, 0.7);
	a {
		float: right;
		display: inline-block;
		text-decoration: none;
		color: rgb(67, 0, 50);
		font-style: italic;
	}
	a:hover {
		text-decoration: underline;
	}
	font-size: 15px;
`

const TryhardProblemBox = props => <div {...props}/>

const ProblemBox = props => <ThemeSelector 
		buzzfeed={<BuzzfeedProblemBox {...props} />} 
		tryhard={<TryhardProblemBox {...props} />} 
	/>

export default ProblemBox