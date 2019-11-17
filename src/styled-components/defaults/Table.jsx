import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedTable = styled.table`
	text-align: left;
	margin: 10px auto;
	border-spacing: 2px;
	thead th {
		background-color: rgba(67, 0, 50, 0.7);
		padding: 0.25em 1.5em;
	}
	tbody td {
		background-color: rgba(67, 0, 50, 0.35);
		padding: 0.25em 1.5em;
	}
`

const TryhardTable = props => <table {...props}/>

const Table = props => <ThemeSelector 
		buzzfeed={<BuzzfeedTable {...props} />} 
		tryhard={<TryhardTable {...props} />} 
	/>

export default Table