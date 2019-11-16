import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants'

const BuzzfeedProblemBoxWrapper = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 100%;

	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
	}
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		display: block;
		flex-wrap: nowrap;	
		li {
			display: block;
			left: -50px;
		}
	}
`

const TryhardProblemBoxWrapper = props => <div {...props}/>

const ProblemBoxWrapper = props => <ThemeSelector 
		buzzfeed={<BuzzfeedProblemBoxWrapper {...props} />} 
		tryhard={<TryhardProblemBoxWrapper {...props} />} 
	/>

export default ProblemBoxWrapper