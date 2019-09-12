import React from "react"
import { Route } from "react-router-dom";

import  Auth from './Auth'

const PrivateRoute = ({loggedIn, component, render, ...rest}) => {
	return (
		<Route
			{...rest}
			render={() => {
					return <Auth loggedIn={loggedIn} component={component || render} />
				}
			}
		/>
	);
}

export default PrivateRoute