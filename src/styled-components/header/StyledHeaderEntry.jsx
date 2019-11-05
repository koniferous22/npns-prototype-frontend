import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedHeaderEntry = styled.li`
	display: inline-block;
	width: auto;
	margin-left: 10px;
`
const TryhardHeaderEntry = props => <li {...props}/>

const HeaderEntry = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeaderEntry {...props} />} 
		tryhard={<TryhardHeaderEntry {...props} />} 
	/>

export default HeaderEntry