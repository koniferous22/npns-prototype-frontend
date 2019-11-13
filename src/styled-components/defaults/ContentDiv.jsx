import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants';

const BuzzfeedContentDiv = styled.div`
	${props => props.sidebar ? `
			margin-left: ${props.marginLeft || "14rem"};
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
`

const TryhardContentDiv = props => <div {...props}/>

const ContentDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedContentDiv {...props} />} 
		tryhard={<TryhardContentDiv {...props} />} 
	/>

export default ContentDiv