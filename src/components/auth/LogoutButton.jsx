import React from 'react'

import Button from '../../styled-components/auth/LogoutButton'

const LogoutButton = (({logout, header}) => {
	return <Button header={header} onClick={logout}>Log out</Button>
});


export default LogoutButton
