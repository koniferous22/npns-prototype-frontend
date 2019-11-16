import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedSubmissionDiv = styled.div`
	width: 90%;
	margin-right: 18px;
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