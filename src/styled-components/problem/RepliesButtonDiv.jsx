import React from 'react'
import styled from 'styled-components';

import ButtonDiv from '../defaults/ButtonDiv'

import ThemeSelector from '../ThemeSelector'

const BuzzfeedRepliesButtonDiv = styled(ButtonDiv)`
	margin-left: 10%;
`

const TryhardRepliesButtonDiv = props => <button {...props} />

const RepliesButtonDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedRepliesButtonDiv {...props} />} 
		tryhard={<TryhardRepliesButtonDiv {...props} />} 
	/>
export default RepliesButtonDiv;
