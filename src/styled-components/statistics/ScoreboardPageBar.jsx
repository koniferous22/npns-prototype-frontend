import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedScoreboardPageBar = styled.table`
	text-align: center;
	margin: auto;
	border-spacing: 10px;
	tbody td {
		background: transparent;
		border-radius: 3px;
		background-color: rgba(67, 0, 50, 0.35);
		color: #962020;
		margin: 2px 1em;
		padding: 0.25em 1em;
		font-weight: bold;
		a {
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}
	}
`

const TryhardScoreboardPageBar = props => <table {...props}/>

const ScoreboardPageBar = props => <ThemeSelector 
		buzzfeed={<BuzzfeedScoreboardPageBar {...props} />} 
		tryhard={<TryhardScoreboardPageBar {...props} />} 
	/>

export default ScoreboardPageBar