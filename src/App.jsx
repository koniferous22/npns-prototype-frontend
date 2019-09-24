import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux'

import Homepage from "./components/home/Homepage"
import Header from "./components/header/Header"

import PrivateRoute from "./components/auth/PrivateRoute"

import Signup from "./components/signup/Signup"
import Login from "./components/auth/Login"
import Profile from "./components/profile/Profile"
import QueuePage from "./components/queue/QueuePage"
import Problem from "./components/problem/Problem"

import { authActions } from './actions/auth'

const App = (props) => {
	const loggedIn = !!props.user
	return (
		<div className='App'>
			<Router>
				<Route render={({history}) => {
					return (
						<div className='App'>
							{
								// use switch components in case of routing conflicts
							}
							<Header logout={props.logout} loggedIn={loggedIn}/>
							<Route exact path="/" render={() => <Homepage />} />
							<Route path="/signup" component={ Signup } />
							<Route path="/login" render={() => <Login loggedIn={loggedIn}/>} />
							<Route path="/q/:name" render={(props) => <QueuePage queue={props.match.params.name} />} />
							<Route path="/problem/:id" render={ () => <Problem /> } />
						
							
							<PrivateRoute path="/profile" render={ () => <Profile /> } loggedIn={loggedIn}/>
						</div>
					);
				}} />
							
			</Router>
		</div>
	)
}

const mapStateToProps = (state) => ({
	// AUTH REDUCER
	user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
	// GLOBAL
	/*setActiveQueue: queue => dispatch(globalActions.setActiveQueue(queue)),*/
	// AUTH
	logout: token => dispatch(authActions.logout(token)),
	login: (username, pwd) => dispatch(authActions.login(username, pwd))/*,
	verify: token => dispatch(authActions.verify(token))*/
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
