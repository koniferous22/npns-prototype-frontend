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
	
		background: #4d3560;
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
			color: #2d117f;
		}

		font-family: Helvetica, Arial, Sans-Serif;
		font-weight: bold;
		font-size: 12px;
	}
	z-index: 1;
`

const TryhardCollapsedSidebar = styled.div`
	display: none;
`

const CollapsedSidebar = props => <ThemeSelector 
		buzzfeed={<BuzzfeedCollapsedSidebar {...props} />} 
		tryhard={<TryhardCollapsedSidebar {...props} />} 
	/>

export default CollapsedSidebar