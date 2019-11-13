import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

//import { sidebarStyleConstants } from '../sidebars/Constants';

const BuzzfeedReplyDiv = styled.div`
	width: 80%;
	float: right;
`

const TryhardReplyDiv = props => <div {...props}/>

const ReplyDiv = props => <ThemeSelector 
		buzzfeed={<BuzzfeedReplyDiv {...props} />} 
		tryhard={<TryhardReplyDiv {...props} />} 
	/>

export default ReplyDiv