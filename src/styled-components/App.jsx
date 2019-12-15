import React from 'react'
import styled from 'styled-components';

import ThemeSelector from './ThemeSelector'

import { sidebarStyleConstants } from './sidebars/Constants'

const BuzzfeedApp = styled.div`
	display: grid;
	grid-tempalte-columns: auto;
	grid-template-rows: [row-start] 60px [header-end] auto [row-end];
	@media(max-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
		grid-template-rows: [row-start] 100px [header-end] auto [row-end];
	}
	grid-template-areas:
		"header"
		"page";
	color: #17082F;
`

const TryhardApp = props => <div {...props}/>

const App = props => <ThemeSelector 
		buzzfeed={<BuzzfeedApp {...props} />} 
		tryhard={<TryhardApp {...props} />} 
	/>

export default App
