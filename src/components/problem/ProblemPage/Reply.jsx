import React from 'react'
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom"

import ReplyBox from '../../../styled-components/problem/ReplyBox'
import ContentInfo from '../../../styled-components/problem/ContentInfo'

export default props => (
	<ReplyBox>
		<ContentInfo>
			{new Date(props.created).toLocaleDateString()}
			{props.user && <Link to={'/u/' + props.user}>{props.user}</Link>}
		</ContentInfo>
		<ReactMarkdown source={props.content} />
	</ReplyBox>
)