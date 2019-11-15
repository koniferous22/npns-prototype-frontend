import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedProblemDiv = styled.div`
	width: 90%;
	margin: auto;

	a {
		display: inline-block;
		text-decoration: none;
		color: rgb(67, 0, 50);
		font-style: italic;
	}
	a:hover {
		text-decoration: underline;
	}
`

const TryhardProblemDiv = props => <div {...props}/>

const ProblemDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedProblemDiv {...props} />} 
		tryhard={<TryhardProblemDiv {...props} />} 
	/>

export default ProblemDiv