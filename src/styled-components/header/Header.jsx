import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedHeader = styled.div`
	flex-shrink: 1;
	
	display: flex;
	align-items: center;
	background: #bf8000;
	border-radius: 3px;
	margin: 0px;
`

const TryhardHeader = props => <div {...props}/>

const Header = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeader {...props} />} 
		tryhard={<TryhardHeader {...props} />} 
	/>

export default Header