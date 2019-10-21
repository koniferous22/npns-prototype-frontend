import React from 'react';
import { connect } from 'react-redux';

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
    console.log('oh boi')
    console.log(this.props)
  }

	render() {
    console.log('oh boyzz')
    console.log(this.props)
		return (
      <p>woohoo aspon toto funguje</p>
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(ProblemPage)
