import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect, Provider } from 'react-redux'

import Homepage from "./components/home/Homepage"
import Header from "./components/header/Header"

import PrivateRoute from "./components/auth/PrivateRoute"

import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Profile from "./components/profile/Profile"
import ProblemIndex from "./components/problems/ProblemIndex"
import Problem from "./components/problems/Problem"

import { authActions } from './actions/auth'
import { globalActions } from './actions/global'

class App extends React.Component {

	render() {
		return (
			<div className='App'>
				<Router>
					<Route render={({history}) => {
						return (
							<div className='App'>
								<Header logout={this.props.logout}/>
								<Route exact path="/" component={ Homepage } />
								<Route path="/register" component={ Register } />
								<Route path="/login" component={ Login } />
							
								
								<PrivateRoute path="/profile" component={ Profile } verify={this.props.verify} token={this.props.token} loggedIn={!!this.props.user}/>
								<Route path="/q/:id" component={ ProblemIndex } />
								<Route path="/problem/:id" component={ Problem } />
							</div>
						);
					}} />
								
				</Router>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	// GLOBAL REDUCER
	activeQueue: state.global.activeQueue,
	// AUTH REDUCER
	user: state.auth.user,
	token: state.auth.token
})

const mapDispatchToProps = (dispatch) => ({
	logout: token => dispatch(authActions.logout(token)),
	login: (username, pwd) => dispatch(authActions.login(username, pwd)),
	verify: token => dispatch(authActions.verify(token)),
	...globalActions
})

export default connect(mapStateToProps,mapDispatchToProps/*, mergeProps*/)(App)
