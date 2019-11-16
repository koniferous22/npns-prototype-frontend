// IMPORTANT HAVE TO REFACTOR NAMES, CUZ THIS WILL BE CONFUSED WITH PROBELM BOX ON QUEUE PAGE

import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedSolutionLabel = styled.div`
	color: green;
	margin-right: 10px;
	margin-left: 0px;
`

const TryhardSolutionLabel = props => <div {...props}/>

const SolutionLabel = props => <ThemeSelector 
		buzzfeed={<BuzzfeedSolutionLabel {...props} />} 
		tryhard={<TryhardSolutionLabel {...props} />} 
	/>

export default SolutionLabel