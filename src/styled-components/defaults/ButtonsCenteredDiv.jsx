import React from 'react'
import styled from 'styled-components';

import ButtonDiv from './ButtonDiv'

import ThemeSelector from '../ThemeSelector'

const BuzzfeedRepliesButtonBlock = styled(ButtonDiv)`
	justify-content: center;	
`

const TryhardRepliesButtonBlock = props => <button {...props} />

const RepliesButtonBlock = props => <ThemeSelector 
		buzzfeed={<BuzzfeedRepliesButtonBlock {...props} />} 
		tryhard={<TryhardRepliesButtonBlock {...props} />} 
	/>
export default RepliesButtonBlock;
