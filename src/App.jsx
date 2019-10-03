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
import ProblemPage from "./components/problem/ProblemPage"

import { authActions } from './actions/auth'

class App extends React.Component {
	
	componentDidMount() {
		this.props.verify(this.props.token)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.token !== this.props.token) {
			this.props.verify(this.props.token)
		}
	}

	render() {
		const loggedIn = !!this.props.user
		return (
			<div className='App'>
				<Router>
					<Route render={({history}) => {
						return (
							<div className='App'>
								{
									'Redux Token: ' + this.props.token + '\n'
								}
								{
									'Storage Token: ' + localStorage.getItem('token') + '\n'
								}
								{
									'LoggedIn: ' + loggedIn
								}
								<Header logout={this.props.logout} loggedIn={loggedIn}/>
								<Route exact path="/" render={() => <Homepage />} />
								<Route path="/signup" component={ Signup } />
								<Route path="/login" render={(routeProps) => <Login loggedIn={loggedIn} redirect={routeProps.location.state.from}/>} />
								<Route path="/q/:name" render={(routeProps) => <QueuePage queue={routeProps.match.params.name} />} />
								<Route path="/problem/:id" render={ (routeProps) => <ProblemPage loggedIn={loggedIn} token={this.props.token} problemId={routeProps.match.params.id}/>} />
							
								
								<PrivateRoute path="/profile" render={ () => <Profile /> } loggedIn={loggedIn}/>
							</div>
						);
					}} />
								
				</Router>
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
	// AUTH REDUCER
	user: state.auth.user,
	token: state.auth.token
})

const mapDispatchToProps = (dispatch) => ({
	// AUTH
	logout: token => dispatch(authActions.logout(token)),
	login: (username, pwd) => dispatch(authActions.login(username, pwd)),
	verify: token => dispatch(authActions.verify(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
