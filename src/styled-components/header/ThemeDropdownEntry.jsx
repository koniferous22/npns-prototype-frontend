import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedDropdownEntry = styled.li`
	margin: 0px 10px 0px 10px;
	font-family: Helvetica, Arial, Sans-Serif;
	font-weight: bold;
	div {
		color: green;
	}
	:hover {
		background-color: #e5e5e5;
		color: black;
		cursor: pointer;
		text-decoration: underline;
	}
`
//bf8000
const TryhardDropdownEntry = styled.li `
	:hover {
		cursor: pointer;
	}
`

const DropdownEntry = props => <ThemeSelector 
		buzzfeed={<BuzzfeedDropdownEntry {...props} />} 
		tryhard={<TryhardDropdownEntry {...props} />} 
	/>

export default DropdownEntry