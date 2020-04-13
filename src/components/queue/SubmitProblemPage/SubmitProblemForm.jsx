import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import Input from '../../form/Input'
import MyEditor from '../../form/MyEditor'
import ReduxFormSelect from '../../form/ReduxFormSelect' //alebo dat toto do pice?
import Select from 'react-select'

import CenteredDiv from '../../../styled-components/defaults/CenteredDiv'
import Button from '../../../styled-components/defaults/Button'

import { submitProblem } from '../../../store/content/submitProblemPage'


const SubmitProblemForm = ({ defaultQueue, token, queueOptions, attachmentUrls }) => {
	const dispatch = useDispatch()
	const { register, handleSubmit, errors } = useForm()

	const transformIntoOption = q => ({value: q, label: q})

	let options = queueOptions || []
	options = options.map(transformIntoOption)

	const submit = data => {
		if (!data.queue) {
			data.queue = transformIntoOption(defaultQueue)
		}
		dispatch(
			submitProblem(
				{
					queue_name: data.queue.value,
					title: data.title,
					content: data.description,
					attachmentUrls: attachmentUrls
				},
				token
			)
		)
	}
//namiesto editoru je tu docasne input a select je broken ako aj predtym
	return (
		<form onSubmit={handleSubmit(submit)}>
			<CenteredDiv>
				<Select name="queue" options={options} defaultValue={transformIntoOption(defaultQueue)} label="Select queue"/>
				<Input name="title" type="text" label="Title" ref={register({ required: true })} errors={errors} alignLeft/>
				<Input name="description" type="textarea" label="Description" ref={register({ required: true })} errors={errors} alignLeft/>
			</CenteredDiv>
			<Button type="submit">Submit</Button>
		</form>
	)
}


export default SubmitProblemForm


/*####################################
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import MyEditor from '../../form/MyEditor'
import renderField from '../../form/RenderField'
import ReduxFormSelect from '../../form/ReduxFormSelect'

import CenteredDiv from '../../../styled-components/defaults/CenteredDiv'
import Button from '../../../styled-components/defaults/Button'

import { submitProblem } from '../../../store/content/submitProblemPage'

const transformIntoOption = q => ({value: q, label: q})

const submit = (values, dispatch, props) => {
	if (!values.queue) {
		values.queue = transformIntoOption(props.defaultQueue)
	}
	dispatch(
		submitProblem(
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
})(SubmitProblemForm)*/
