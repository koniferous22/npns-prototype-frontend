import React from 'react';
import { Field, reduxForm } from 'redux-form'


import { findUser, validateUserExists } from '../../../store/content/statistics/scoreboardPage'
import renderField from '../../form/RenderField'

import Button from '../../../styled-components/defaults/Button'

const submit = ({ identifier }, dispatch, { queue }) => {
	dispatch(findUser(queue, identifier, 50))
}


const validate = ({ identifier }) => {
	const errors = {}
	if (!identifier) {
		errors.identifier = 'Required'
	}
	return errors
}

const ScoreboardSearchUserForm = ({ handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Field name="identifier" component={renderField} type="text" label='Search User' placeholder='Username or email'/>
			</div>
			<Button type="submit">Search</Button>
		</form>
	)
}

export default reduxForm({
	form: 'form',
	validate,
	asyncValidate: (values, dispatch, props, blurredField) => {
		if (blurredField === 'identifier') {
			return validateUserExists(values.identifier)
		}
		return new Promise.resolve()
	},
	asyncBlurFields: ['identifier'],
	onSubmit: submit,
	getFormState: ({content}) => content.statistics.scoreboard.form
})(ScoreboardSearchUserForm)
