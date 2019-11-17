import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

	//float: ${props => props.float || 'left'};
const BuzzfeedCollapsedSidebarDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	${props => props.width && `width: ${props.width};`}
	${props => props.grow && 'flex-grow: 1;'}
	${props => props.shrink && 'flex-shrink: 1;'}
	vertical-align: middle;
	padding: 10px;
	color: #2d117f;
`
const TryhardCollapsedSidebarDiv = props => <div {...props}/>

const CollapsedSidebarDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedCollapsedSidebarDiv {...props} />} 
		tryhard={<TryhardCollapsedSidebarDiv {...props} />} 
	/>

export default CollapsedSidebarDiv