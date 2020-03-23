import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

import StatisticsSidebar from './StatisticsSidebar'

import { loadKarmaValues } from '../../store/content/statistics/economyPage'
import { hierarchy } from '../../store/global'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'
import Table from '../../styled-components/defaults/Table'

const EconomyPage = () => {
	const dispatch = useDispatch()
	const {
		karmaValues,
		message,
		messageType
	} = useSelector((state) => state.content.statistics.economyPage)
	useEffect(() => {
		dispatch(loadKarmaValues())
		dispatch(hierarchy())
	})
	return (
		<PageDiv>
			<StatisticsSidebar />
			<ContentDiv sidebar>
				<CenteredDiv fullWidth>
				<BackendMessage messageType={messageType}>
					{message}
				</BackendMessage>
				<h3>
					Karma values
				</h3>
				<Table>
					<tbody>
						{
							karmaValues && karmaValues.map(q => (
								<tr key={q.name}>
									<td><Link to={'/q/' + q.name}>{q.name}</Link></td>
									<td>{ q.karmaValue}</td>
								</tr>
							))
						}
					</tbody>
				</Table>
				</CenteredDiv>
			</ContentDiv>
		</PageDiv>
	)
}

export default EconomyPage
