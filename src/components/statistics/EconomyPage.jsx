import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import { economyPageActions } from '../../actions/content/economyPage'
import { globalActions } from '../../actions/global'

const mapStateToProps = (state) => ({
	hierarchy: state.global.hierarchy,
	...state.content.economyPage
})

const mapDispatchToProps = (dispatch) => ({
	loadKarmaValues: (token) => dispatch(economyPageActions.loadKarmaValues(token)),
	hierarchy: () => dispatch(globalActions.hierarchy())
})

class ProblemPage extends React.Component {

	componentDidMount() {
		this.props.hierarchy()
		this.props.loadKarmaValues(this.props.token)
	}

	render() {
		const karmaValues = this.props.karmaValues
		if (!karmaValues) {
			return (
          <p>loading...</p>
      )
    }
    else {
      return(
        <div>
        <ul>
            {karmaValues.map(q => (
                <li key={q.name}>
                    <Link to={'/q/' + q.name}>{q.name}</Link> 
                    <p>karma value: {q.karmaValue}</p>
                </li>
            ))}
        </ul>
        </div>
      )
    }
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(ProblemPage)
