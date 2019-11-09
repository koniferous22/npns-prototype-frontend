import React from 'react'
import styled from 'styled-components';

import Button, { BuzzfeedButton } from '../defaults/Button'

const BuzzfeedLogoutButton = styled(BuzzfeedButton)`
	${props => props.header && `@media(max-width: 750px) {
    	display: block;
	}
	@media(max-width: 550px) {
		float: none;
	}
	`}

`

const LogoutButton = props => <Button buzzfeed={<BuzzfeedLogoutButton {...props}/>} />

export default LogoutButton;
