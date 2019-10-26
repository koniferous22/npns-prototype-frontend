import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux'

import Homepage from "./components/home/Homepage"
import Header from "./components/header/Header"

import PrivateRoute from "./components/routes/PrivateRoute"
import NonAuthRoute from './components/routes/NonAuthRoute'
import ProfileRoute from "./components/routes/ProfileRoute"

import SignUpPage from "./components/signup/SignUpPage"
import Login from "./components/auth/Login"
import LogoutPage from './components/auth/LogoutPage'

import ForgotPassword from './components/forgotpwd/ForgotPassword'
import QueuePage from "./components/queue/QueuePage"
import ProblemPage from "./components/problem/ProblemPage"
import SubmitProblemPage from "./components/queue/SubmitProblemPage"

import ProfilePage from "./components/profile/ProfilePage"
import ActivityPage from "./components/profile/ActivityPage"

import PersonalInformationPage from './components/profile/PersonalInformationPage'
import PremiumPage from './components/profile/PremiumPage'
import TransactionPage from './components/profile/TransactionPage'
import EconomyPage from "./components/statistics/EconomyPage"

import ConfirmRegistrationPage from "./components/confirm/Registration"

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
								<Header logout={this.props.logout} loggedIn={loggedIn} username={this.props.user ? this.props.user.username : null}/>
								<Switch>
									<Route exact path="/" render={() => <Homepage user={this.props.user}/>} />
									<NonAuthRoute path="/signup" loggedIn={loggedIn} render={() => <SignUpPage/> } />
									<NonAuthRoute path="/forgotpwd" loggedIn={loggedIn} render={(routeProps) => <ForgotPassword loggedIn={loggedIn} redirect={(routeProps.location && routeProps.location.state) ? routeProps.location.state.from : null}/>}/>
									<Route path="/login" loggedIn={loggedIn} render={(routeProps) => <Login loggedIn={loggedIn} redirect={(routeProps.location && routeProps.location.state) ? routeProps.location.state.from : '/'}/>} />

									<Route exact path="/q/:name" render={(routeProps) => <QueuePage queue={routeProps.match.params.name} />} />
									<PrivateRoute path="/q/:queuename/submitProblem" render={(routeProps) => <SubmitProblemPage token={this.props.token} queue={routeProps.match.params.queuename}/>} loggedIn={loggedIn}/>
									
									<Route path="/problem/:id" render={ (routeProps) => <ProblemPage loggedIn={loggedIn} token={this.props.token} problemId={routeProps.match.params.id}/>} />
																	

									<Route exact path="/u/:username" render={ 
										(routeProps) => <ProfilePage 
											viewer={this.props.user ? this.props.user.username : null}
											user={routeProps.match.params.username}
											loggedIn={loggedIn}
										/> }/>
									<Route path="/u/:username/activity" render={ 
										(routeProps) => <ActivityPage 
											viewer={this.props.user ? this.props.user.username : null}
											user={routeProps.match.params.username}
											loggedIn={loggedIn}
										/> }/>
									<ProfileRoute path={'/u/:username/personal'} render={(routeProps) => (<PersonalInformationPage user={routeProps.match.params.username}/>)} loggedIn={loggedIn} viewer={this.props.user ? this.props.user.username : null}/>
									<ProfileRoute path={'/u/:username/premium'} render={(routeProps) => (<PremiumPage user={routeProps.match.params.username}/>)} loggedIn={loggedIn} viewer={this.props.user ? this.props.user.username : null}/>
									<ProfileRoute path={'/u/:username/transactions'} render={(routeProps) => <TransactionPage user={routeProps.match.params.username}/>} loggedIn={loggedIn} viewer={this.props.user ? this.props.user.username : null}/>
									
									<PrivateRoute path="/statistics/economy" render={() => <EconomyPage token={this.props.token}/>} loggedIn={loggedIn}/>
									
									<Route path='/logout' render={(routeProps) => <LogoutPage loggedIn={loggedIn} redirect={(routeProps.location && routeProps.location.state) ? routeProps.location.state.from : '/login'} logout={this.props.logout}/>}/>
									<Route path="/confirm/registration/:token" render={(routeProps) => <ConfirmRegistrationPage token={routeProps.match.params.token}/>} />
									
									{loggedIn && <Redirect from='/profile' to={'/u/' + this.props.user.username} />}
									
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
	token: state.auth.token,
	loggingIn: state.auth.loggingIn
})

const mapDispatchToProps = (dispatch) => ({
	// AUTH
	logout: token => dispatch(authActions.logout(token)),
	login: (username, pwd) => dispatch(authActions.login(username, pwd)),
	verify: token => dispatch(authActions.verify(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
