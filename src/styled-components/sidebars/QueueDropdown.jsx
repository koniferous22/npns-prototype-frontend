import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedQueueDropdown = styled.div`
	margin: 0px 10px 0px 10px;
	font-family: Helvetica, Arial, Sans-Serif;
	background-color:maroon;
	padding:6px;
	border-radius:5px;
	font-weight:bold;
	color:white;
	:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`

const TryhardQueueDropdown = props => <div {...props} />

const QueueDropdown = props => <ThemeSelector 
		buzzfeed={<BuzzfeedQueueDropdown {...props} />} 
		tryhard={<TryhardQueueDropdown {...props} />} 
	/>

export default QueueDropdown