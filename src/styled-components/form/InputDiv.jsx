import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedInputDiv = styled.div`
	input {
		border-radius: 5px;
		margin: 10px 5px 5px 5px;
		font-size: 15px;
	}
`

const TryhardInputDiv = props => <div {...props}/>

const InputDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedInputDiv {...props} />} 
		tryhard={<TryhardInputDiv {...props} />} 
	/>

export default InputDiv