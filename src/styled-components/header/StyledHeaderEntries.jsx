import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedHeader = styled.ul`
	display: inline;
`
const TryhardHeader = props => <ul {...props}/>

const Header = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeader {...props} />} 
		tryhard={<TryhardHeader {...props} />} 
	/>

export default Header