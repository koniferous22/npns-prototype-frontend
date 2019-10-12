import React from "react"
import { /*Route,*/ Redirect } from "react-router-dom";
import Auth from '../auth/Auth';

const ProfileAccess = ({viewer, user, resource, ...rest}) => {
	console.log(resource)
	if (viewer === user) {
		return <Auth {...rest}/>	
	} else if (!!viewer) {
		return <Redirect to={'/u/' + viewer + '/' + resource} />	
	} else {
		return <Redirect to={'/u/' + user}/>
	}
}

export default ProfileAccess