// IMPORTANT HAVE TO REFACTOR NAMES, CUZ THIS WILL BE CONFUSED WITH PROBELM BOX ON QUEUE PAGE

import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedSolvedLabel = styled.div`
	color: green;
`

const TryhardSolvedLabel = props => <div {...props}/>

const SolvedLabel = props => <ThemeSelector 
		buzzfeed={<BuzzfeedSolvedLabel {...props} />} 
		tryhard={<TryhardSolvedLabel {...props} />} 
	/>

export default SolvedLabel