import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from './Constants'

const BuzzfeedSidebar = styled.div`
	grid-area: sidebar;
	position: fixed;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		display: none;
	}

	height: 80%;
	padding: 10px;
	margin-top: 20px;
	margin-bottom: 20px;

	background: transparent;
	border-right: 1px solid #3d325c;

	font-family: Helvetica, Arial, Sans-Serif;
	font-weight: bold;
	font-size: 12px;

	a {
		text-decoration: none;
		color: rgb(17,0,73);
	}
	a:hover {
		text-decoration: underline;
	}
`//padding-left: 20px;
//left: 

const TryhardSidebar = props => <div {...props} shiftLists={undefined	}/>

const Sidebar = props => <ThemeSelector 
		buzzfeed={<BuzzfeedSidebar {...props} />} 
		tryhard={<TryhardSidebar {...props} />} 
	/>

export default Sidebar