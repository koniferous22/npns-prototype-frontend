import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import StatisticsSidebar from './StatisticsSidebar'

import { economyPageActions } from '../../actions/content/statistics/economyPage'
import { globalActions } from '../../actions/global'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'
import Table from '../../styled-components/defaults/Table'

const mapStateToProps = (state) => ({
	hierarchy: state.global.hierarchy,
	...state.content.statistics.economyPage
})

const mapDispatchToProps = (dispatch) => ({
	loadKarmaValues: (token) => dispatch(economyPageActions.loadKarmaValues(token)),
	hierarchy: () => dispatch(globalActions.hierarchy())
})

class EconomyPage extends React.Component {

	componentDidMount() {
		this.props.hierarchy()
		this.props.loadKarmaValues(this.props.token)
	}

	render() {
		const karmaValues = this.props.karmaValues
		const message = this.props.message
		return(
			<PageDiv>
				<StatisticsSidebar />
				<ContentDiv sidebar>
					<CenteredDiv fullWidth>
					<BackendMessage messageType={this.props.messageType}>
						{message && message}
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
}



export default connect(mapStateToProps, mapDispatchToProps)(EconomyPage)
