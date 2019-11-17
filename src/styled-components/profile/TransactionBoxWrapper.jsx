import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedTransactionBoxWrapper = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 100%;

	display: block;
	li {
		display: block;
		left: -50px;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}
`

const TryhardTransactionBoxWrapper = props => <div {...props}/>

const TransactionBoxWrapper = props => <ThemeSelector 
		buzzfeed={<BuzzfeedTransactionBoxWrapper {...props} />} 
		tryhard={<TryhardTransactionBoxWrapper {...props} />} 
	/>

export default TransactionBoxWrapper