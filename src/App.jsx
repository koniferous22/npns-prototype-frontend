import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux'

import Homepage from "./components/home/Homepage"
import Header from "./components/header/Header"

import PrivateRoute from "./components/auth/PrivateRoute"

import Signup from "./components/signup/Signup"
import Login from "./components/auth/Login"
import Profile from "./components/profile/Profile"
import QueuePage from "./components/queue/QueuePage"
import ProblemPage from "./components/problem/ProblemPage"

import ConfirmRegistrationPage from "./components/confirm/registration"

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
								<Header logout={this.props.logout} loggedIn={loggedIn} username={this.props.user ? this.props.user.username : null}/>
								<Switch>
									<Route exact path="/" render={() => <Homepage user={this.props.user}/>} />
									<Route path="/signup" component={ Signup } />
									<Route path="/login" render={(routeProps) => <Login loggedIn={loggedIn} redirect={(routeProps.location && routeProps.location.state) ? routeProps.location.state.from : null}/>} />
									<Route path="/q/:name" render={(routeProps) => <QueuePage queue={routeProps.match.params.name} />} />
									<Route path="/problem/:id" render={ (routeProps) => <ProblemPage loggedIn={loggedIn} token={this.props.token} problemId={routeProps.match.params.id}/>} />
																	
									<Route path="/u/:username" render={ 
										(routeProps) => <Profile 
											viewer={this.props.user ? this.props.user.username : null}
											user={routeProps.match.params.username}
											loggedIn={loggedIn}
										/> } loggedIn={loggedIn}/>

									<Route path="/confirm/registration/:token" render={(routeProps) => <ConfirmRegistrationPage token={routeProps.match.params.token}/>} />
									
									<Redirect from='/profile' to={'/u/' + ((this.props.user && this.props.user.username) ? this.props.user.username : null)} />
								</Switch>
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
