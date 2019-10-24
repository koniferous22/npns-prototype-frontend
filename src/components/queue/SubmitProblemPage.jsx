import React from 'react';
import { connect } from 'react-redux';

import SubmitProblemForm from './SubmitProblemPage/SubmitProblemForm'

const mapStateToProps = (state, ownProps) => ({
	queue: ownProps.queue,
	token: ownProps.token,
	//userId: state.auth.user._id //bacha, musim byt lognuty, jinak hodi error... osetrit PrivateRoute
})

class SubmitProblemPage extends React.Component {
	
	render() {
		return(
			<div>
				<p>Submitting new problem to queue {this.props.queue}</p>
				<SubmitProblemForm queue={this.props.queue} token={this.props.token}/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(SubmitProblemPage)
