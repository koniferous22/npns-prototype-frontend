import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants'

const BuzzfeedProblemBoxWrapper = styled.div`
	margin-left: auto;
	margin-right: auto;
	display: flex;
	width: 100%;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	ul {
		list-style-type: none;
		li {
			display: inline-block;
		}
	}
`

const TryhardProblemBoxWrapper = props => <div {...props}/>

const ProblemBoxWrapper = props => <ThemeSelector 
		buzzfeed={<BuzzfeedProblemBoxWrapper {...props} />} 
		tryhard={<TryhardProblemBoxWrapper {...props} />} 
	/>

export default ProblemBoxWrapper