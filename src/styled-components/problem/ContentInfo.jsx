import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedContentInfo = styled.div`
	float:right;
	
`
	
const TryhardContentInfo = props => <div {...props}/>

const ContentInfo = props => <ThemeSelector 
		buzzfeed={<BuzzfeedContentInfo {...props} />} 
		tryhard={<TryhardContentInfo {...props} />} 
	/>

export default ContentInfo