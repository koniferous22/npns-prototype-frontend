import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedSubmissionBox = styled.div`
	${props => props.solution && `
		box-shadow: 5px 10px 18px rgba(0, 124, 30, 0.5);
		border: 2px solid #0d3e00;
		margin-bottom: 20px;
	`}
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