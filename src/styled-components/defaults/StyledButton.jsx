import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedButton = styled.button`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	margin: 0 1em;
	padding: 0.25em 1em;
`

const TryhardButton = props => <button {...props}/>

const Button = props => <ThemeSelector 
		buzzfeed={<BuzzfeedButton {...props} />} 
		tryhard={<TryhardButton {...props} />} 
	/>

export default Button