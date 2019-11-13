import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'

//import { sidebarStyleConstants } from '../sidebars/Constants';

const BuzzfeedReplyBox = styled.div`
	border-radius: 10px;
	padding: 7px;
	margin-top: 10px;
	background-color: rgba(67, 0, 50, 0.35);
`

const TryhardReplyBox = props => <div {...props}/>

const ReplyBox = props => <ThemeSelector 
		buzzfeed={<BuzzfeedReplyBox {...props} />} 
		tryhard={<TryhardReplyBox {...props} />} 
	/>

export default ReplyBox