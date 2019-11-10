import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedHeaderEntry = styled.li`
	margin: 0px 10px 0px 10px;
	font-family: Helvetica, Arial, Sans-Serif;
	font-weight: bold;
	a {
		color: #6f3301;
		text-decoration: none;
	}
`
//bf8000
const TryhardHeaderEntry = props => <li {...props}/>

const HeaderEntry = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeaderEntry {...props} />} 
		tryhard={<TryhardHeaderEntry {...props} />} 
	/>

export default HeaderEntry