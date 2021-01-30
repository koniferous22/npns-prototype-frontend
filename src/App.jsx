import { ApolloClient, InMemoryCache, gql, ApolloProvider, useQuery } from '@apollo/client';

import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import IEPage from './components/issues/InternetExplorer'

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
import BoostPage from "./components/problem/BoostPage"
import SubmitProblemPage from "./components/queue/SubmitProblemPage"

import ProfilePage from "./components/profile/ProfilePage"
import ActivityPage from "./components/profile/ActivityPage"

import PersonalInformationPage from './components/profile/PersonalInformationPage'
import PremiumPage from './components/profile/PremiumPage'
import TransactionPage from './components/profile/TransactionPage'
import EconomyPage from "./components/statistics/EconomyPage"
import ScoreboardPage from "./components/statistics/ScoreboardPage"

import ConfirmRegistrationPage from "./components/confirm/Registration"
import ConfirmPasswordChangePage from "./components/confirm/PasswordChange"
import ConfirmEmailChangePage from "./components/confirm/EmailChange"
import ConfirmUsernameChangePage from "./components/confirm/UsernameChange"

import { logout, login, verify } from './store/auth'

import AppDiv from './styled-components/App'

const client = new ApolloClient({
	uri: 'http://localhost:3000/',
	cache: new InMemoryCache()
  });

const parseUrlParam = (routeProps, paramName) => new URLSearchParams(routeProps.location.search).get(paramName)

function App() {
	const { user, token } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const mounted = useRef();
	useEffect(() => {
		if (!mounted.current) {
			dispatch(verify(token));
			mounted.current = true;
		} else {
			dispatch(verify(token));
		}
	}, []);

	const loggedIn = !!user
	if((navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode === true )) { //IF IE > 10
		return (<IEPage />)
	}

	return (
		<ApolloProvider client={client}>
			<Router>
				<AppDiv>
					<Header logout={dispatch(logout)} loggedIn={loggedIn} username={user ? user.username : null}/>
					<Switch>
						<Route exact path="/" render={() => <Homepage user={user}/>} />
						<NonAuthRoute path="/signup" loggedIn={loggedIn} render={() => <SignUpPage/> } />
						<NonAuthRoute path="/forgotpwd" loggedIn={loggedIn} render={(routeProps) => <ForgotPassword loggedIn={loggedIn} redirect={(routeProps.location && routeProps.location.state) ? routeProps.location.state.from : null}/>}/>
						<Route path="/login" loggedIn={loggedIn} render={(routeProps) => <Login loggedIn={loggedIn} redirect={(routeProps.location && routeProps.location.state) ? routeProps.location.state.from : '/'}/>} />

						<Route exact path="/q/:name" render={(routeProps) => <QueuePage queue={routeProps.match.params.name} loggedIn={loggedIn}/>} />
						<PrivateRoute path="/submitProblem" render={(routeProps) => <SubmitProblemPage token={token} urlQueue={parseUrlParam(routeProps, 'q')}/>} loggedIn={loggedIn}/>
						
						<Route exact path="/problem/:id" render={ (routeProps) => <ProblemPage loggedIn={loggedIn} token={token} problemId={routeProps.match.params.id} user={user}/>} />
						<Route path="/problem/:id/boost" render={(routeProps) => loggedIn && <BoostPage token={token} problemId={routeProps.match.params.id} loggedIn={loggedIn}/>} />

						<Route exact path="/u/:username" render={ 
							(routeProps) => <ProfilePage 
								viewer={user ? user.username : null}
								user={routeProps.match.params.username}
								loggedIn={loggedIn}
							/> }/>
						<Route path="/u/:username/activity" render={ 
							(routeProps) => <ActivityPage 
								viewer={user ? user.username : null}
								user={routeProps.match.params.username}
								loggedIn={loggedIn}
							/> }/>
						<ProfileRoute path={'/u/:username/personal'} render={(routeProps) => (<PersonalInformationPage user={routeProps.match.params.username} token={token}/>)} loggedIn={loggedIn} viewer={user ? user.username : null}/>
						<ProfileRoute path={'/u/:username/premium'} render={(routeProps) => (<PremiumPage user={routeProps.match.params.username}/>)} loggedIn={loggedIn} viewer={user ? user.username : null}/>
						<ProfileRoute path={'/u/:username/transactions'} render={(routeProps) => <TransactionPage user={routeProps.match.params.username} token={token}/>} loggedIn={loggedIn} viewer={user ? user.username : null}/>
						
						<Route path="/statistics/economy" render={() => <EconomyPage token={token}/>} loggedIn={loggedIn}/>
						<Route path="/statistics/scoreboard/:queue" render={(routeProps) => <ScoreboardPage token={token} queue={routeProps.match.params.queue} urlPage={Number(parseUrlParam(routeProps, 'page')) || 1} />} loggedIn={loggedIn} />

						
						<Route path='/logout' render={(routeProps) => <LogoutPage loggedIn={loggedIn} redirect={(routeProps.location && routeProps.location.state) ? routeProps.location.state.from : '/login'} logout={dispatch(logout)}/>}/>
						<NonAuthRoute path="/confirm/registration/:token" loggedIn={loggedIn} render={(routeProps) => <ConfirmRegistrationPage token={routeProps.match.params.token}/>} />
						<NonAuthRoute path="/confirm/passwordChange/:token" loggedIn={loggedIn} render={(routeProps) => <ConfirmPasswordChangePage token={routeProps.match.params.token}/>} />
						<NonAuthRoute path="/confirm/emailChange/:token" loggedIn={loggedIn} render={(routeProps) => <ConfirmEmailChangePage token={routeProps.match.params.token}/>} />
						<NonAuthRoute path="/confirm/usernameChange/:token" loggedIn={loggedIn} render={(routeProps) => <ConfirmUsernameChangePage token={routeProps.match.params.token}/>} />
						
						{loggedIn && <Redirect from='/profile' to={'/u/' + user.username} />}
					</Switch>
				</AppDiv>
			</Router>
		</ApolloProvider>
	)
}

export default App;
