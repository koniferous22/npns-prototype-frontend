import React from 'react'
import ReactMarkdown from 'react-markdown';
import ReplyBox from '../../../styled-components/problem/ReplyBox'

export default props => (
	<ReplyBox>
		<p>
			<ReactMarkdown source={props.content} />
		</p>
	</ReplyBox>
)