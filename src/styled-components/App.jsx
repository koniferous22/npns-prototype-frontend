import React from 'react'
import styled from 'styled-components';

import ThemeSelector from './ThemeSelector'

const BuzzfeedHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const TryhardHeader = props => <div {...props}/>

const Header = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeader {...props} />} 
		tryhard={<TryhardHeader {...props} />} 
	/>

export default Header