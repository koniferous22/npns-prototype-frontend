import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

export const BuzzfeedButton = styled.button`
	background: transparent;
	border-radius: 3px;
	border: 2px solid #962020;
	color: #962020;
	margin: 0 1em;
	padding: 0.25em 1em;
`

export const TryhardButton = props => <button {...props}/>

const Button = props => <ThemeSelector 
		buzzfeed={props.buzzfeed || <BuzzfeedButton {...props} />} 
		tryhard={props.tryhard || <TryhardButton {...props} />} 
	/>

export default Button