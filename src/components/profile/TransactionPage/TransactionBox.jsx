import React from 'react';
import { Link } from 'react-router-dom'

import StyledTransactionBox from '../../../styled-components/profile/TransactionBox'
import TransactionBoxMeta from '../../../styled-components/profile/TransactionBoxMeta'
import TransactionBoxMetaSection from '../../../styled-components/profile/TransactionBoxMetaSection'

const TransactionBox = (props) => (
	<StyledTransactionBox>
		<TransactionBoxMeta>
			<TransactionBoxMetaSection grow>
				{new Date(props.created).toLocaleDateString()}
			</TransactionBoxMetaSection>
			<TransactionBoxMetaSection>
				<Link to={'/q/' + props.queue}>{props.queue}</Link>
				{' Karma value: ' + props.karma_value}
			</TransactionBoxMetaSection>
			<TransactionBoxMetaSection>
				{'Monetary value: ' + props.monetary_value + "$"}
			</TransactionBoxMetaSection>
		</TransactionBoxMeta>
		{props.description}<br/>
	</StyledTransactionBox>	
)

export default TransactionBox
