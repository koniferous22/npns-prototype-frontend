import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedHeaderDiv = styled.div`
	float: left;
	display: inline-block;
	width: ${props => props.width || "100%"};
	padding-top: auto;
`
const TryhardHeaderDiv = props => <div {...props}/>

const HeaderDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHeaderDiv {...props} />} 
		tryhard={<TryhardHeaderDiv {...props} />} 
	/>

export default HeaderDiv