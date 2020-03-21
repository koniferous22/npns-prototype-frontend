import React from 'react'
import MarkdownRender from '../../form/MarkdownRender'
import { Link } from "react-router-dom"

import ReplyBox from '../../../styled-components/problem/ReplyBox'
import ContentInfo from '../../../styled-components/problem/ContentInfo'

import { dateTimeDefaultLocale, dateTimeOptions } from '../../../constants/misc/dateTimeOptions'

export default ({ created, user, content }) => (
	<ReplyBox>
		<ContentInfo>
			{new Date(created).toLocaleDateString(dateTimeDefaultLocale, dateTimeOptions)}
			{user && <Link to={'/u/' + user}>{user}</Link>}
		</ContentInfo>
		<MarkdownRender source={content} />
	</ReplyBox>
)
