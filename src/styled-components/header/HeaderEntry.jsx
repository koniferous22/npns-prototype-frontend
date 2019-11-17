import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedHeaderEntry = styled.li`
	margin: 0px 10px 0px 10px;
	font-family: Helvetica, Arial, Sans-Serif;
	font-weight: bold;
	a {
		color: rgb(17,0,73);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
`
//bf8000
const TryhardHeaderEntry = props => <li {...props}/>

const HeaderEntry = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeaderEntry {...props} />} 
		tryhard={<TryhardHeaderEntry {...props} />} 
	/>

export default HeaderEntry