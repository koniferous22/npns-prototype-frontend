import React from 'react'
import styled from 'styled-components';

import StyledButton, { BuzzfeedButton } from '../defaults/StyledButton'

const BuzzfeedLogoutButton = styled(BuzzfeedButton)`
	float: right;
	display: inline-block;,
	margin: auto;
	${props => props.header && `@media(max-width: 600px) {
    	float: none;
	}`}
`

const LogoutButton = props => <StyledButton buzzfeed={<BuzzfeedLogoutButton {...props}/>} />

export default LogoutButton;
