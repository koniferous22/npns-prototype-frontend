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
`

const TryhardProblemBox = props => <div {...props}/>

const ProblemBox = props => <ThemeSelector 
		buzzfeed={<BuzzfeedProblemBox {...props} />} 
		tryhard={<TryhardProblemBox {...props} />} 
	/>

export default ProblemBox