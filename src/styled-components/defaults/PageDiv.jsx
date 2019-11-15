import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants'

const BuzzfeedContentDiv = styled.div`
	grid-area: page;
	align-self: end;

	display: grid;
	grid-tempalte-rows: auto;
	grid-template-columns: [column-start] 4rem [sidebar-end] auto [column-end];
	grid-template-areas:
		"sidebar content";
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		grid-tempalte-rows: [page-row-start] 60px [collapsed-sidebar-end] auto [page-row-end];
		grid-template-columns: auto;
		grid-template-areas:
			"collapsed-sidebar"
			"content";
	}
`


const TryhardContentDiv = props => <div {...props}/>

const ContentDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedContentDiv {...props} />} 
		tryhard={<TryhardContentDiv {...props} />} 
	/>

export default ContentDiv