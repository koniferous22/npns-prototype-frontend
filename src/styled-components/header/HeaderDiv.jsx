import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { headerStyleConstants } from './Constants'

	//float: ${props => props.float || 'left'};
const BuzzfeedHeaderDiv = styled.div`
	display: flex;
	flex-wrap: wrap; 
	justify-content: ${props => props.shrink ? 'center' : 'flex-start'};
	${props => props.grow && 'flex-grow: 1;'}
	${props => props.shrink && 'flex-shrink: 1;'}
	vertical-align: middle;
	padding: 10px;
	${props => `font-size: ${props.fontSize || '14px'}` };
	color: rgb(17,0,73);
	font-family: Verdana, Arial, Helvetica, sans-serif;
	@media(max-width: ${headerStyleConstants.HEADER_COLLAPSE_LOGGED_IN_CAPTION}) {
		${props => props.collapse && "display: none;"}
	}
`
const TryhardHeaderDiv = props =><div {...props} shrink={undefined} grow={undefined} collapse={undefined} fontSize={undefined}/>

const HeaderDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeaderDiv {...props} />} 
		tryhard={<TryhardHeaderDiv {...props} />} 
	/>

export default HeaderDiv