import React from "react"
import { Route } from "react-router-dom";

import  Auth from '../auth/Auth'

const PrivateRoute = ({loggedIn, render, ...rest}) => {
	
	return (
		<Route
			{...rest}
			render={(routeProps) => {
					return <Auth loggedIn={loggedIn} component={() => render(routeProps)} />
				}
			}
		/>
	);
}

export default PrivateRoute