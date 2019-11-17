import React from 'react'
import styled from 'styled-components';

import Table from '../defaults/Table'

import ThemeSelector from '../ThemeSelector'

const BuzzfeedNumberedTable = styled(Table)`
	counter-reset: row-num;
	tbody tr  {
		counter-increment: row-num;
	}
	tbody tr td:first-child::before {
		content: counter(row-num) ". ";
	}
`

const TryhardNumberedTable = props => <table {...props} />

const NumberedTable = props => <ThemeSelector 
		buzzfeed={<BuzzfeedNumberedTable {...props} />} 
		tryhard={<TryhardNumberedTable {...props} />} 
	/>
export default NumberedTable;
