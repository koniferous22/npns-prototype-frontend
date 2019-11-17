import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

const BuzzfeedReactSelectDiv = styled.div`
	margin: 10px 5px 5px 5px;
`

const TryhardReactSelectDiv = props => <div {...props}/>

const ReactSelectDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedReactSelectDiv {...props} />} 
		tryhard={<TryhardReactSelectDiv {...props} />} 
	/>

export default ReactSelectDiv