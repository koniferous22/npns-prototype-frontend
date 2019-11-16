import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedRepliesButtonBlock = styled.div`
	display: flex;
`

const TryhardRepliesButtonBlock = props => <button {...props} />

const RepliesButtonBlock = props => <ThemeSelector 
		buzzfeed={<BuzzfeedRepliesButtonBlock {...props} />} 
		tryhard={<TryhardRepliesButtonBlock {...props} />} 
	/>
export default RepliesButtonBlock;
