import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { headerStyleConstants } from './Constants'

	//float: ${props => props.float || 'left'};
const BuzzfeedHeaderDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	${props => props.width && `width: ${props.width};`}
	${props => props.grow && 'flex-grow: 1;'}
	${props => props.shrink && 'flex-shrink: 1;'}
	vertical-align: middle;
	@media(max-width: ${headerStyleConstants.HEADER_COLLAPSE_LOGGED_IN_CAPTION}) {
		${props => props.collapse && "display: none;"}
	}
`
const TryhardHeaderDiv = props => <div {...props}/>

const HeaderDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeaderDiv {...props} />} 
		tryhard={<TryhardHeaderDiv {...props} />} 
	/>

export default HeaderDiv