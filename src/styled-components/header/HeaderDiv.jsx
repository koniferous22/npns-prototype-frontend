import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { headerStyleConstants } from './Constants'

const BuzzfeedHeaderDiv = styled.div`
	float: left;
	display: inline-block;
	${props => props.width && `width: ${props.width};`}
	${props => props.maxWidth && `max-width: ${props.maxWidth};`}
	${props => props.minWidth && `min-width: ${props.minWidth};`}
	@media(max-width: ${headerStyleConstants.HEADER_COLLAPSE_LOGGED_IN_MEDIUM}) {
    	display: ${props => props.collapse ? "none" : "block"};
    	${props => !props.collapse && 'width: 100%;'}
	}
`
const TryhardHeaderDiv = props => <div {...props}/>

const HeaderDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeaderDiv {...props} />} 
		tryhard={<TryhardHeaderDiv {...props} />} 
	/>

export default HeaderDiv