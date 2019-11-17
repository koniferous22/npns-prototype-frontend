import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants'

const BuzzfeedTransactionBox = styled.div`
	display: flex;
	flex-direction: column;

	width: 90%;
	margin: 20px;
	border-radius: 10px;
	padding: 10px;
	background-color: rgba(67, 0, 50, 0.7);
`

const TryhardTransactionBox = props => <div {...props}/>

const TransactionBox = props => <ThemeSelector 
		buzzfeed={<BuzzfeedTransactionBox {...props} />} 
		tryhard={<TryhardTransactionBox {...props} />} 
	/>

export default TransactionBox