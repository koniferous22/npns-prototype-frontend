import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants';

const BuzzfeedContentDiv = styled.div`
	grid-area: ${props => props.sidebar ? 'content' : 'page'};
	${props => props.sidebar ? `
			margin-left: 10rem;
		` : `
			margin-left: auto;
			margin-right: auto;
		`}
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		margin-left: auto;
		margin-right: auto;
	}
	margin-top: 20px;
	padding: 10px;
	font-family: Verdana, sans-serif;

	input {
		border-radius: 5px;
	}
`

const TryhardContentDiv = props => <div {...props}/>

const ContentDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedContentDiv {...props} />} 
		tryhard={<TryhardContentDiv {...props} />} 
	/>

export default ContentDiv