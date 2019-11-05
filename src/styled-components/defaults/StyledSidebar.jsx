import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedSidebar = styled.div`
	width: ${props => props.sidebarWidth || "30%"};
	float: left;
	heigth: 100%;
	border: 2px solid;
	position: fixed;
	display: inline-block;
`

const TryhardSidebar = props => <div {...props}/>

const Sidebar = props => <ThemeSelector 
		buzzfeed={<BuzzfeedSidebar {...props} />} 
		tryhard={<TryhardSidebar {...props} />} 
	/>

export default Sidebar