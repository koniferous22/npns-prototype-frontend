import React from 'react';
import { Route } from "react-router-dom";
import ProfileSidebar from './ProfileSidebar'

import PersonalInformationPage from './PersonalInformationPage'
import PremiumPage from './PremiumPage'
import TransactionPage from './TransactionPage'
import PublicUserPage from './PublicUserPage'


const ProfilePage = (props) => {
	/*
	1. Migrate routes
	2. just render eiter sidebar 
	*/
	const base_url = '/u/' + props.user
	const auth_view = (props.user === props.viewer && props.loggedIn)

	const auth_routes = [
		<Route path={base_url + '/personal'} render={(routeProps) => (<PersonalInformationPage />)}/>,
		<Route path={base_url + '/premium'} render={(routeProps) => (<PremiumPage />)}/>,
		<Route path={base_url + '/transactions'} render={(routeProps) => <TransactionPage />}/>
	]
	const public_routes = [
		<Route exact path={base_url} render={(routeProps) => (<PublicUserPage/>)}/>
	]

	const routes = auth_view ? public_routes.concat(auth_routes) : public_routes
	return (
		<div>
			{auth_view && <ProfileSidebar baseUrl={base_url}/>}
			{routes}
		</div>
	);
}
export default ProfilePage;
