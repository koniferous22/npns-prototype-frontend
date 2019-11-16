import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants'

const BuzzfeedProblemBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	width: 250px;
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		width: 100%;
	}
	height: 100px;
	margin: 20px;
	border-radius: 10px;
	padding: 10px;
	background-color: rgba(67, 0, 50, 0.7);
`

const TryhardProblemBox = props => <div {...props}/>

const ProblemBox = props => <ThemeSelector 
		buzzfeed={<BuzzfeedProblemBox {...props} />} 
		tryhard={<TryhardProblemBox {...props} />} 
	/>

export default ProblemBox