import React from 'react';
import { Route } from "react-router-dom";
import ProfileSidebar from './ProfileSidebar'
import TransactionPage from './TransactionPage'

const Profile = (props) => {
	/*console.log('PROFILLEEE')
	console.log(props)
	if (!props.user) {
		return (<div>kokott</div>)
	}*/
	const base_url = '/u/' + props.user
	const auth_view = (props.user === props.viewer && props.loggedIn)
	/*console.log('CONSOLEEEE')
	console.log(props.user)*/
	const auth_routes = [
		<Route path={base_url + '/personal'} render={(routeProps) => (<p>NYI</p>)}/>,
		<Route path={base_url + '/premium'} render={(routeProps) => (<p>NYI2</p>)}/>,
		<Route path={base_url + '/transactions'} render={(routeProps) => <TransactionPage />}/>
	]
	const public_routes = [
		<Route path={base_url + '/public'} render={(routeProps) => (<p>NYI4</p>)}/>
	]

	const routes = auth_view ? public_routes.append(auth_routes) : public_routes
	return (
		<div>
			{auth_view ? <ProfileSidebar baseUrl={base_url}/> : <p>Idz do pici</p>}
			{routes}
		</div>
	);
}
export default Profile;
