import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../../form/RenderField'
import ReduxFormSelect from '../../form/ReduxFormSelect'

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
					content: values.description
				},
				props.token
			)
	)
}

const validate = values => {
	const errors = {}
	/*if (!values.queue) {
		errors.queue = 'Required'
	}*/
	if (!values.title) {
		errors.title = 'Required'
	}
	return errors
}

const SubmitProblemForm = props => {
	const { handleSubmit } = props;
	const transformIntoOption = q => ({value: q, label: q})

	let options = props.queueOptions || []
	options = options.map(transformIntoOption)

	return (<form onSubmit={handleSubmit}>
			<Field name="queue" component={ReduxFormSelect} options={options} defaultValue={transformIntoOption(props.defaultQueue)} label='Select queue'/>
			<Field name="title" component={renderField} type="text" label='Title'/>
			<Field name="description" component={renderField} type="text" label='Description'/>
		<button type="submit">Submit</button>
	</form>)
}

export default reduxForm({
	form: 'form',
	onSubmit: submit,
	validate,
	getFormState: ({content}) => content.submitProblem.form
})(SubmitProblemForm)
