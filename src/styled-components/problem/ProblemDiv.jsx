import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedProblemDiv = styled.div`
	width: 80%;
	margin: auto;
`

const TryhardProblemDiv = props => <div {...props}/>

const ProblemDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedProblemDiv {...props} />} 
		tryhard={<TryhardProblemDiv {...props} />} 
	/>

export default ProblemDiv