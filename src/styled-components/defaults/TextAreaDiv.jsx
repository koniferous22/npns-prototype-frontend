import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'


const BuzzfeedTextAreaDiv = styled.div`
	${props => props.center ? 'margin: 10px auto;' : 'margin-top: 10px; margin-bottom: 10px;'}
	width: 80%;
	textarea {
		width: 100%;
		height: 100px;
	}

`

const TryhardTextAreaDiv = props => <div {...props}/>

const TextAreaDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedTextAreaDiv {...props} />} 
		tryhard={<TryhardTextAreaDiv {...props} />} 
	/>

export default TextAreaDiv