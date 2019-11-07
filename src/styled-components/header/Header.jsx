import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { headerStyleConstants } from './Constants'

const BuzzfeedHeader = styled.div`
	height: 50px;
	border: 2px solid;
	${props => props.loggedIn === true ? `@media(min-width: ${headerStyleConstants.HEADER_COLLAPSE_LOGGED_IN_SMALL}) and (max-width: ${headerStyleConstants.HEADER_COLLAPSE_LOGGED_IN_MEDIUM}) {
		height: 80px;
	}
	@media(max-width: ${headerStyleConstants.HEADER_COLLAPSE_LOGGED_IN_SMALL}) {
		height: 130px;
	}` : `@media(max-width: ${headerStyleConstants.HEADER_COLLAPSE_LOGGED_OUT}) {
		height: 80px;
	}`}
`

const TryhardHeader = props => <div {...props}/>

const Header = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeader {...props} />} 
		tryhard={<TryhardHeader {...props} />} 
	/>

export default Header