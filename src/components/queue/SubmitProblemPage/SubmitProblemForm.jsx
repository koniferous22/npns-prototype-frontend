import React from 'react'
import { Field, reduxForm } from 'redux-form'

import MyEditor from '../../form/MyEditor'
import renderField from '../../form/RenderField'
import ReduxFormSelect from '../../form/ReduxFormSelect'

import CenteredDiv from '../../../styled-components/defaults/CenteredDiv'
import Button from '../../../styled-components/defaults/Button'

import { submitProblemActions } from '../../../actions/content/submitProblem'

const transformIntoOption = q => ({value: q, label: q})

const submit = (values, dispatch, props) => {
	if (!values.queue) {
		values.queue = transformIntoOption(props.defaultQueue)
	}
	dispatch(
		submitProblemActions
			.submit(
				{
					queue_name: values.queue.value,
					title: values.title,
					content: values.description,
					attachmentUrls: props.attachmentUrls
				},
				props.token
			)
	)
}

const validate = values => {
	const errors = {}
	if (!values.title) {
		errors.title = 'Required'
	}
	if (!values.description) {
		errors.description = 'Required'
	}
	return errors
}

const SubmitProblemForm = props => {
	const { handleSubmit } = props;
	const transformIntoOption = q => ({value: q, label: q})

	let options = props.queueOptions || []
	options = options.map(transformIntoOption)

	return (
		<form onSubmit={handleSubmit}>
			<CenteredDiv>
				<Field name="queue" component={ReduxFormSelect} options={options} defaultValue={transformIntoOption(props.defaultQueue)} label="Select queue"/>
				<Field name="title" component={renderField} type="text" label="Title"/>
			</CenteredDiv>
			<Field name="description" component={MyEditor} />
			<Button type="submit">Submit</Button>
		</form>
	)
}

export default reduxForm({
	form: 'form',
	onSubmit: submit,
	validate,
	getFormState: ({content}) => content.submitProblem.form
})(SubmitProblemForm)
