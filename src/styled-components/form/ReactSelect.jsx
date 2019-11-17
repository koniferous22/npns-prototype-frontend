import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import Select from 'react-select';

const BuzzfeedReactSelect = styled(Select)`
	margin: 10px 5px 5px 5px;
`

const TryhardReactSelect = props => <Select {...props}/>

const ReactSelect = props => <ThemeSelector 
		buzzfeed={<BuzzfeedReactSelect {...props} />} 
		tryhard={<TryhardReactSelect {...props} />} 
	/>

export default ReactSelect