import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import StatisticsSidebar from './StatisticsSidebar'

import { economyPageActions } from '../../actions/content/statistics/economyPage'
import { globalActions } from '../../actions/global'

import ContentDiv from '../../styled-components/defaults/StyledContentDiv'

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
			<div>
				<StatisticsSidebar />
				<ContentDiv sidebar>
					{message && message}
					<ul>
						{karmaValues && karmaValues.map(q => (
							<li key={q.name}>
								<Link to={'/q/' + q.name}>{q.name} </Link> 
								karma value: { q.karmaValue}
							</li>
						))}
					</ul>
				</ContentDiv>
			</div>
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(EconomyPage)
