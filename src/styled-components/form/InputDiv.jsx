import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedInputDiv = styled.div`
	
	${props => props.alignLeft && 'margin-left: 10%;'}
	input {
		border-radius: 5px;
		margin: 5px 5px 10px 5px;
		font-size: 15px;
		${props => props.alignLeft && 'width: 80%;'}
	}
`

const TryhardInputDiv = props => <div {...props} alignLeft={undefined}/>

const InputDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedInputDiv {...props} />} 
		tryhard={<TryhardInputDiv {...props} />} 
	/>

export default InputDiv