import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedThemeDropdown = styled.div`
	margin: 0px 10px 0px 10px;
	font-family: Helvetica, Arial, Sans-Serif;
	color: #962020;
	border: 2px solid;
	border-radius: 3px;
	padding: 3px;
	margin: 2px;
	:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`
const TryhardThemeDropdown = styled.div`
	:hover {
		cursor: pointer;
	}
`

const ThemeDropdown = props => <ThemeSelector 
		buzzfeed={<BuzzfeedThemeDropdown {...props} />} 
		tryhard={<TryhardThemeDropdown {...props} />} 
	/>

export default ThemeDropdown