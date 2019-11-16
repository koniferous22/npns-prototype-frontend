import React from 'react'
import styled from 'styled-components';

import Button from '../defaults/Button'

import ThemeSelector from '../ThemeSelector'

const BuzzfeedLoadRepliesButton = styled(Button)`
	border: none;
	display: inline-block;
`

const TryhardLoadRepliesButton = props => <button {...props} />

const LoadRepliesButton = props => <ThemeSelector 
		buzzfeed={<BuzzfeedLoadRepliesButton {...props} />} 
		tryhard={<TryhardLoadRepliesButton {...props} />} 
	/>
export default LoadRepliesButton;
