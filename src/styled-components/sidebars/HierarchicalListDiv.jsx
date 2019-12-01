import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedHierarchicalListDiv = styled.div`
	ul {
		position: relative;
		padding-inline-start: 20px;
	}
	padding-left: 20px;
`

const TryhardHierarchicalListDiv = props => <div {...props} />

const HierarchicalListDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedHierarchicalListDiv {...props} />} 
		tryhard={<TryhardHierarchicalListDiv {...props} />} 
	/>

export default HierarchicalListDiv