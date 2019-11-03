import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedHeaderEntry = styled.ul`
	background: transparent;
	list-style-type: none;
	display: inline;
`
const TryhardHeaderEntry = props => <li {...props}/>

const HeaderEntry = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeaderEntry {...props} />} 
		tryhard={<TryhardHeaderEntry {...props} />} 
	/>

export default HeaderEntry