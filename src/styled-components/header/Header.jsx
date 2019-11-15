import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'
import { sidebarStyleConstants } from '../sidebars/Constants'

const BuzzfeedHeader = styled.div`
	grid-area: header;

	position: fixed;
	display: flex;
	width: 100%
	height: 60px;
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		height: 100px;
	}
	align-items: center;
	background: #bf8000;
	border-radius: 3px;
	margin: 0px;
`

const TryhardHeader = props => <div {...props}/>

const Header = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeader {...props} />} 
		tryhard={<TryhardHeader {...props} />} 
	/>

export default Header