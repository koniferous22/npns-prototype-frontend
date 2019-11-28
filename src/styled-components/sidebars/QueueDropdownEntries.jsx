import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedQueueEntriesWrapper = styled.div`
	position:absolute;
`

const BuzzfeedQueueEntries = styled.ul`
	list-style-type: none;

	margin: 0;
	padding: 0;
	width: 175px;

	background-color: white;
	font-weight:bold;
	position: absolute;

	li {
		display: block;
		padding: 8px 16px;
		border-bottom: 1px solid #e5e5e5;
		width: 100%;
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

const TryhardQueueEntries = props => <ul {...props}/>

const QueueEntries = props => <ThemeSelector 
		buzzfeed={<BuzzfeedQueueEntries {...props} />} 
		tryhard={
			<BuzzfeedQueueEntriesWrapper>
				<TryhardQueueEntries {...props} />
			</BuzzfeedQueueEntriesWrapper>
		} 
	/>

export default QueueEntries;