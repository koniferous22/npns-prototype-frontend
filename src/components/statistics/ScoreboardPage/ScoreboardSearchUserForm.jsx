import React from 'react';
import { Field, reduxForm } from 'redux-form'

import { scoreboardPageActions } from '../../../actions/content/statistics/scoreboardPage'
import renderField from '../../form/RenderField'
const submit = (values, dispatch, props) => {
	dispatch(scoreboardPageActions.findUser(props.queue, values.identifier, 50))
}


const validate = values => {
	const errors = {}
	if (!values.identifier) {
		errors.identifier = 'Required'
	}
	return errors
}

const ScoreboardSearchUserForm = props => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Field name="identifier" component={renderField} type="text" label='Identifier' placeholder='Username or email'/>
			</div>
			<button type="submit">Search User</button>
		</form>
	)
}

export default reduxForm({
	form: 'form',
	validate,
	asyncValidate: (values, dispatch, props, blurredField) => {
		if (blurredField === 'identifier') {
			return scoreboardPageActions.validateUserExists(values.identifier)
		}
		return new Promise()
	},
	asyncBlurFields: ['identifier'],
	onSubmit: submit,
	getFormState: ({content}) => content.statistics.scoreboard.form
})(ScoreboardSearchUserForm)