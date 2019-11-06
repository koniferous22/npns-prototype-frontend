import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedContentDiv = styled.div`
	display: inline-block;
	margin-left: ${props => props.sidebar ? (props.marginLeft || "21%") : "auto"};
	margin-right: ${props => props.sidebar ? "0%" : "auto"}
`

const TryhardContentDiv = props => <div {...props}/>

const ContentDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedContentDiv {...props} />} 
		tryhard={<TryhardContentDiv {...props} />} 
	/>

export default ContentDiv