import React from 'react'

import Button from '../../styled-components/auth/StyledLogoutButton'

const LogoutButton = (({loggedIn,logout}) => {
	if (loggedIn) {
		return <Button onClick={logout}>Log out</Button>
	}
	return <p>Oi maite show mai yar login loicense</p>
});


export default LogoutButton
