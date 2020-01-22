import React from 'react'
import MarkdownRender from '../../form/MarkdownRender'
import { Link } from "react-router-dom"

import ReplyBox from '../../../styled-components/problem/ReplyBox'
import ContentInfo from '../../../styled-components/problem/ContentInfo'

import { dateTimeDefaultLocale, dateTimeOptions } from '../../../constants/misc/dateTimeOptions'

export default props => (
	<ReplyBox>
		<ContentInfo>
			{new Date(props.created).toLocaleDateString(dateTimeDefaultLocale, dateTimeOptions)}
			{props.user && <Link to={'/u/' + props.user}>{props.user}</Link>}
		</ContentInfo>
		<MarkdownRender source={props.content} />
	</ReplyBox>
)
