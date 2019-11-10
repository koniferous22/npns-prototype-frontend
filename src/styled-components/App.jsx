import React from 'react'
import styled from 'styled-components';

import ThemeSelector from './ThemeSelector'

const BuzzfeedApp = styled.div`
	
`

const TryhardApp = props => <div {...props}/>

const App = props => <ThemeSelector 
		buzzfeed={<BuzzfeedApp {...props} />} 
		tryhard={<TryhardApp {...props} />} 
	/>

export default App