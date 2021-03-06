import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedThemeEntries = styled.ul`
	list-style-type: none;

	margin: 0;
	padding: 0;
	top:45px;
	right:0px;
	width: 200px;
	background-color: white;
	font-weight:bold;
	position: absolute;

	li {
		padding: 8px 16px;
		border-bottom: 1px solid #e5e5e5;
	}
	li:last-child {
		border-bottom: none;
	}
	li:hover {
		background-color: #e5e5e5;
		color: black;
		cursor: pointer;
		text-decoration: underline;
	}
`

const TryhardThemeEntries = styled.ul`
	li:hover {
		cursor: pointer;
	}
`

const ThemeEntries = props => <ThemeSelector 
		buzzfeed={<BuzzfeedThemeEntries {...props} />} 
		tryhard={<TryhardThemeEntries {...props} />} 
	/>

export default ThemeEntries;