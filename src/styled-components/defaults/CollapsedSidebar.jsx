import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { defaultStyleConstants } from './Constants'

const BuzzfeedCollapsedSidebar = styled.div`
	display: none;
	@media(max-width: ${defaultStyleConstants.DEFAULT_SIDEBAR_COLLAPSE}) {
		height: 50px;
		display: block;
		border: 2px solid;
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