import React from "react"
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
	return Object.assign(ownProps, {
		loggedIn: !!state.auth.user
	});
}

const PrivateRoute = connect(mapStateToProps)(({loggedIn: LoggedIn , component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				LoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
})

export default PrivateRoute;
