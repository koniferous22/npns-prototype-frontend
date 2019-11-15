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

	height: 100%;
	padding: 10px;

	background-color: #b85243;

	font-family: Helvetica, Arial, Sans-Serif;
	font-weight: bold;
	font-size: 12px;
	border-radius: 3px;

	a {
		text-decoration: none;
		color: #65302c;
	}
	a:hover {
		text-decoration: underline;
	}
`

const TryhardSidebar = props => <div {...props}/>

const Sidebar = props => <ThemeSelector 
		buzzfeed={<BuzzfeedSidebar {...props} />} 
		tryhard={<TryhardSidebar {...props} />} 
	/>

export default Sidebar