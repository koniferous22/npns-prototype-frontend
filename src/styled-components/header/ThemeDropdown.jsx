import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedThemeDropdown = styled.div`
	color: rgb(17,0,73);
	border: 2px solid;
	border-radius: 3px;
	padding: 0.25em 1em;
	margin: 2px 1em
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