import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedTransactionBoxMeta = styled.ul`
	display: flex;
	justify-content: space-between;
	flex-basis: 30px;
	font-size: 11px;
	list-style-type: none;
	padding: 0px;
`

const TryhardTransactionBoxMeta = props => <ul {...props}/>

const TransactionBoxMeta = props => <ThemeSelector 
		buzzfeed={<BuzzfeedTransactionBoxMeta {...props} />} 
		tryhard={<TryhardTransactionBoxMeta {...props} />} 
	/>

export default TransactionBoxMeta