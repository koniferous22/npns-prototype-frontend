import React from "react"
import { Route } from "react-router-dom";

import  Auth from './Auth'

const PrivateRoute = ({loggedIn, component, ...rest}) => {
	return (
		<Route
			{...rest}
			render={routeProps => {
					return <Auth loggedIn={loggedIn} component={component || rest.render} />
				}
			}
		/>
	);
}

export default PrivateRoute