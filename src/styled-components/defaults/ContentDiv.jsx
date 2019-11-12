import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants';

const BuzzfeedContentDiv = styled.div`
	display: inline-block;
	margin-left: ${props => props.sidebar ? (props.marginLeft || "17em") : "auto"};	
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		margin-left: auto;
		margin-right: auto;
	}
`

const TryhardContentDiv = props => <div {...props}/>

const ContentDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedContentDiv {...props} />} 
		tryhard={<TryhardContentDiv {...props} />} 
	/>

export default ContentDiv