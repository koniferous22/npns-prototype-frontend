import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { defaultStyleConstants } from './Constants'

const BuzzfeedSidebar = styled.div`
	width: ${props => props.sidebarWidth || "20%"};
	float: left;
	margin-top: 30vh;
	border: 2px solid;
	position: fixed;
	display: flex;
	align-items:center;
	@media(max-width: ${defaultStyleConstants.DEFAULT_SIDEBAR_COLLAPSE}) {
		display: none;
	}
`

const TryhardSidebar = props => <div {...props}/>

const Sidebar = props => <ThemeSelector 
		buzzfeed={<BuzzfeedSidebar {...props} />} 
		tryhard={<TryhardSidebar {...props} />} 
	/>

export default Sidebar