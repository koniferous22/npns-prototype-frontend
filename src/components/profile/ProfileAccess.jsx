import React from "react"
import { /*Route,*/ Redirect } from "react-router-dom";
import Auth from '../auth/Auth';

const ProfileAccess = ({viewer, user, resource, ...rest}) => {
	console.log(resource)
	return viewer === user ? <Auth {...rest}/> : <Redirect to={'/u/' + viewer + '/' + resource} />
}

export default ProfileAccess