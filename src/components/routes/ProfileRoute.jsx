import React from "react"
import { Route } from "react-router-dom";

import ProfileAccess from '../profile/ProfileAccess'

const ProfileRoute = ({render, viewer, loggedIn, isPublic, ...rest}) => {
	return (isPublic) 
	 ? <Route 
	 	{...rest}
	 	render={(routeProps) => render(routeProps)}
	 />
	 : <Route 
		{...rest}
		render={(routeProps) => <ProfileAccess
			user={routeProps.match.params.username} 
			viewer={viewer} 
			resource={routeProps.match.url.split(routeProps.match.params.username)[1].split('/')[1]}
			component={() => render(routeProps)}
			loggedIn={loggedIn}
		/>}
	/>;
}

export default ProfileRoute