import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { headerStyleConstants } from './Constants'

const BuzzfeedHeader = styled.ul`
	list-style-type: none;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	float: left;
	@media(max-width: ${headerStyleConstants.HEADER_COLLAPSE_LOGGED_IN_CAPTION}) {
		justify-content: space-around;
	}
`
const TryhardHeader = props => <ul {...props}/>

const Header = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeader {...props} />} 
		tryhard={<TryhardHeader {...props} />} 
	/>

export default Header