import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedTransactionBoxMetaSection = styled.span`
	${props => props.grow && 'flex-grow: 1;'}
	margin-right: 10px;
`

const TryhardTransactionBoxMetaSection = props => <span {...props} grow={undefined}/>

const TransactionBoxMetaSection = props => <ThemeSelector 
		buzzfeed={<BuzzfeedTransactionBoxMetaSection {...props} />} 
		tryhard={<TryhardTransactionBoxMetaSection {...props} />} 
	/>

export default TransactionBoxMetaSection