import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import {
	submitEmailChange,
	submitPasswordChange,
	submitUsernameChange,
	submitNamesChange
} from '../../../store/content/profile/personalInformationPage'


const ProfileUpdateDispatcher = ({ form, token, values, user }) => {
	const dispatch = useDispatch()
	const email = useCallback(() => dispatch(submitEmailChange(values.email, token)), [values, token, dispatch])
	const password = useCallback(() => dispatch(submitPasswordChange(user)), [user, dispatch])
	const username = useCallback(() => dispatch(submitUsernameChange(values.username, token)), [values, token, dispatch])
	const names = useCallback(() => dispatch(submitNamesChange(values.firstName, values.lastName, token)), [values, token, dispatch])
	const error = () => {throw new Error('wut?')}

	useEffect(() => {
		switch (form) {
			case 'email':
				email()
				break
			case 'password':
				password()
				break
			case 'username':
				username()
				break
			case 'names':
				names()
				break
			default:
				error()
		}
  }, [form, email, password, username, names]);

	return <div/>
}

export default ProfileUpdateDispatcher
