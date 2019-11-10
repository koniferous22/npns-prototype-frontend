import React from 'react'
import styled from 'styled-components';

import Button, { BuzzfeedButton } from '../defaults/Button'

const BuzzfeedLogoutButton = styled(BuzzfeedButton)`
	
`

const LogoutButton = props => <Button buzzfeed={<BuzzfeedLogoutButton {...props}/>} />

export default LogoutButton;
