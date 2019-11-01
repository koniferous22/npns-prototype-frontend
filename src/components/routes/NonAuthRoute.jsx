import React from "react"
import { Route, Redirect } from "react-router-dom";

import history from '../../history'

const NonAuthRoute = ({loggedIn, render, ...rest}) => {
	
	return (
		<Route
			{...rest}
			render={(routeProps) => {
					return loggedIn ?
						<Redirect
							to={{
								pathname: "/logout",
								state: { from: history.location.pathname }
							}}
						/>
					: render(routeProps)
				}
			}
		/>
	);
}

export default NonAuthRoute