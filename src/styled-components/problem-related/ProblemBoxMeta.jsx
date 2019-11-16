import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedProblemBoxMeta = styled.ul`
	display: flex;
	justify-content: space-between;
	font-size: 11px;
	list-style-type: none;
	padding: 0px;
`

const TryhardProblemBoxMeta = props => <ul {...props}/>

const ProblemBoxMeta = props => <ThemeSelector 
		buzzfeed={<BuzzfeedProblemBoxMeta {...props} />} 
		tryhard={<TryhardProblemBoxMeta {...props} />} 
	/>

export default ProblemBoxMeta