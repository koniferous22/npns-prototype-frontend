import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "./components/home/Homepage"

import Header from "./components/header/Header"

import Register from "./components/register/Register"
import Login from "./components/login/Login"
import QueueIndex from "./components/queues/QueueIndex-useless"
import Profile from "./components/profile/Profile"
import ProblemIndex from "./components/problems/ProblemIndex"
import Problem from "./components/problems/Problem"
import PrivateRoute from "./components/helper/PrivateRoute"

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Header />
					
					<Route exact path="/" component={ Homepage } />
					<Route path="/register" component={ Register } />
					<Route path="/login" component={ Login } />
				
					<Route path="/profile" component={ Profile } />
					<Route path="/q/:id" component={ ProblemIndex } />
					<Route path="/problem/:id" component={ Problem } />
				</div>
			</Router>
		);
	}
}

// <Route path="/q" component={ QueueIndex } />




