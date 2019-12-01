import React from 'react'
import { boostActions } from '../../../actions/content/boost'
import { Field, reduxForm } from 'redux-form'

import FormButton from '../../../styled-components/form/FormButton'
import renderField from '../../form/RenderField'

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

let BoostForm = props => {
	const { handleSubmit } = props;
	return (<form onSubmit={handleSubmit}>
		<div>
			<Field name="boost" label="Boost Value" component={renderField} validate={[number, positive]} type="number" step="any" alignLeft/>
		</div>
		<FormButton type="submit" alignLeft>Boost!</FormButton>
	</form>)
}

BoostForm = reduxForm({
	form: 'form',
	onSubmit: boost,
	getFormState: ({content}) => content.boost.form
})(BoostForm)

export default BoostForm
