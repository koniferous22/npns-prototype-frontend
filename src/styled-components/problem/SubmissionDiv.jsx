import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedSubmissionDiv = styled.div`
	width: 80%;
	ul {
		list-style-type: none;
		display: block;
	}
	float: right;
`

const TryhardSubmissionDiv = props => <div {...props}/>

const SubmissionDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedSubmissionDiv {...props} />} 
		tryhard={<TryhardSubmissionDiv {...props} />} 
	/>

export default SubmissionDiv