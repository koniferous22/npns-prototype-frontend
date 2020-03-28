import React from 'react';
import { Link } from 'react-router-dom'

import StyledTransactionBox from '../../../styled-components/profile/TransactionBox'
import TransactionBoxMeta from '../../../styled-components/profile/TransactionBoxMeta'
import TransactionBoxMetaSection from '../../../styled-components/profile/TransactionBoxMetaSection'

const TransactionBox = ({ created, queue, karma_value, monetary_value, description }) => (
	<StyledTransactionBox>
		<TransactionBoxMeta>
			<TransactionBoxMetaSection grow>
				{new Date(created).toLocaleDateString()}
			</TransactionBoxMetaSection>
			<TransactionBoxMetaSection>
				<Link to={'/q/' + queue}>{queue}</Link>
				{' Karma value: ' + karma_value}
			</TransactionBoxMetaSection>
			<TransactionBoxMetaSection>
				{'Monetary value: ' + monetary_value + "$"}
			</TransactionBoxMetaSection>
		</TransactionBoxMeta>
		{description}<br/>
	</StyledTransactionBox>	
)

export default TransactionBox
