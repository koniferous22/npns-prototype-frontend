import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedInlineDiv = styled.div`
	display: inline;
`
const TryhardInlineDiv = props => <div {...props}/>

const InlineDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedInlineDiv {...props} />} 
		tryhard={<TryhardInlineDiv {...props} />} 
	/>

export default InlineDiv