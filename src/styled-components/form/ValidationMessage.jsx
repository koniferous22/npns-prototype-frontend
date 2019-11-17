import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedValidationMessage = styled.div`
	color: red;
`

const TryhardValidationMessage = props => <div {...props}/>

const ValidationMessage = props => <ThemeSelector 
		buzzfeed={<BuzzfeedValidationMessage {...props} />} 
		tryhard={<TryhardValidationMessage {...props} />} 
	/>

export default ValidationMessage