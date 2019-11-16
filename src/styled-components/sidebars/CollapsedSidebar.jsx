import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from './Constants'

const BuzzfeedCollapsedSidebar = styled.div`
	display: none;
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		grid-area: collapsed-sidebar;

		display: flex;
		align-items: center;
		position: fixed;

		widtH: 100%;
		height:60px;
	
		background-color: #b85243;
		ul {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: space-around;
			list-style-type: none;
			li {
				margin: 0px 8px 0px 8px;
			}
		}
		a {
			text-decoration: none;
			color: #65302c;
		}

		font-family: Helvetica, Arial, Sans-Serif;
		font-weight: bold;
		font-size: 12px;
	}
`

const TryhardCollapsedSidebar = styled.div`
	display: none;
`

const CollapsedSidebar = props => <ThemeSelector 
		buzzfeed={<BuzzfeedCollapsedSidebar {...props} />} 
		tryhard={<TryhardCollapsedSidebar {...props} />} 
	/>

export default CollapsedSidebar