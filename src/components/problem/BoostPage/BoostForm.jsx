import React from 'react'
import { boostActions } from '../../../actions/content/boost'
import { Field, reduxForm } from 'redux-form'

let boost = (values, dispatch, props) => {
	dispatch(
		boostActions
			.boost({value: values.boost, problemId: props.problemId}, props.token)
	)
}

const number = value =>
	isNaN(Number(value)) ? 'Must be a number' : undefined
const positive = value =>
	value > 0 ? undefined : 'Must be a positive number'

const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning }
}) => (
	<div>
		<label>{label}</label>
		<div>
			<input {...input} placeholder={label} type={type} />
			{touched &&
				((error && <span>{error}</span>) ||
				(warning && <span>{warning}</span>))}
		</div>
	</div>
)

let BoostForm = props => {
	const { handleSubmit } = props;
	return (<form onSubmit={handleSubmit}>
		<div>
			<label htmlFor="boost">Boost value</label>
			<Field name="boost" component={renderField} validate={[number, positive]} type="number" step="any"/>
		</div>
		<button type="submit">Boost!</button>
	</form>)
}

BoostForm = reduxForm({
	form: 'form',
	onSubmit: boost,
	getFormState: ({content}) => content.boost.form
})(BoostForm)

export default BoostForm
