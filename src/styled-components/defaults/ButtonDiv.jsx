import React from 'react'
import styled from 'styled-components';

import ButtonsDiv from './ButtonsDiv'

import ThemeSelector from '../ThemeSelector'

const BuzzfeedRepliesButtonsBlock = styled(ButtonsDiv)`
	display: flex;
`

const TryhardRepliesButtonsBlock = props => <button {...props} />

const RepliesButtonsBlock = props => <ThemeSelector 
		buzzfeed={<BuzzfeedRepliesButtonsBlock {...props} />} 
		tryhard={<TryhardRepliesButtonsBlock {...props} />} 
	/>
export default RepliesButtonsBlock;
