import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants';

const BuzzfeedCenteredDiv = styled.div`
	text-align: center;
`

const TryhardCenteredDiv = props => <div {...props}/>

const CenteredDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedCenteredDiv {...props} />} 
		tryhard={<TryhardCenteredDiv {...props} />} 
	/>

export default CenteredDiv