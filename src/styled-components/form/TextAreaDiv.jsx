import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'


const BuzzfeedTextAreaDiv = styled.div`
	margin: 10px 5px 5px 5px;
	${props => props.center && 'margin: 10px auto;'}
	width: 80%;
	textarea {
		width: 100%;
		height: 100px;
	}

`

const TryhardTextAreaDiv = props => <div {...props} center={undefined}/>

const TextAreaDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedTextAreaDiv {...props} />} 
		tryhard={<TryhardTextAreaDiv {...props} />} 
	/>

export default TextAreaDiv