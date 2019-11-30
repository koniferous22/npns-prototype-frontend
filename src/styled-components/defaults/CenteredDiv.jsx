import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

import { sidebarStyleConstants } from '../sidebars/Constants';

const BuzzfeedCenteredDiv = styled.div`
	text-align: center;
	${props => props.fullWidth && `
		@media(min-width: ${sidebarStyleConstants.SIDEBAR_COLLAPSE}) {
			margin-right: 16%;
		}
	`}
`

const TryhardCenteredDiv = props => <div {...props} fullWidth={undefined} textLeft={undefined}/>

const CenteredDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedCenteredDiv {...props} />} 
		tryhard={<TryhardCenteredDiv {...props} />} 
	/>

export default CenteredDiv