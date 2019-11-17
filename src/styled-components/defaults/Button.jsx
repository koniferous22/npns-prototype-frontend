import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

export const BuzzfeedButton = styled.button`
	background: transparent;
	border-radius: 3px;
	${props => !props.noBorder && 'border: 2px solid rgb(17,0,73);'}
	color: rgb(17,0,73);
	margin: 2px 1em;
	padding: 0.25em 1em;
	:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`

export const TryhardButton = props => <button {...props} noBorder={undefined}/>

const Button = props => <ThemeSelector 
		buzzfeed={props.buzzfeed || <BuzzfeedButton {...props} />} 
		tryhard={props.tryhard || <TryhardButton {...props} />} 
	/>

export default Button