import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedHeader = styled.div`
	height: 50px;
	border: 2px solid;
	@media(max-width: 700px) {
    	height: ${props => props.loggedIn === true ? '130px' : '80px' };
	}
`
const TryhardHeader = props => <div {...props}/>

const Header = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeader {...props} />} 
		tryhard={<TryhardHeader {...props} />} 
	/>

export default Header