import React from 'react'
const LogoutButton = (({loggedIn,logout}) => {
	if (loggedIn) {
		return <button onClick={logout}>Log out</button>
	}
	return <p>Oi maite show mai yar login loicense</p>
});


export default LogoutButton
