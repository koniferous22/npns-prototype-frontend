import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedSubmissionBox = styled.div`
	border-radius: 10px;
	padding: 8px;
	margin: 10px auto 0 auto;
	background-color: rgba(67, 0, 50, 0.5);
	ul {
		list-style-type: none;
	}
`

const TryhardSubmissionBox = props => <div {...props}/>

const SubmissionBox = props => <ThemeSelector 
		buzzfeed={<BuzzfeedSubmissionBox {...props} />} 
		tryhard={<TryhardSubmissionBox {...props} />} 
	/>

export default SubmissionBox