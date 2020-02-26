import React from 'react'
import { boostActions } from '../../../actions/content/boost'
import { Field, reduxForm } from 'redux-form'

import FormButton from '../../../styled-components/form/FormButton'
import renderField from '../../form/RenderField'

let submitBoost = (values, dispatch, props) => {
	dispatch(boostActions.submitBoost({value: values.boost}))
}
let adjustBoost = (values, dispatch, props) => {
	dispatch(boostActions.adjustBoost({value: values.boost}))
}

const number = value =>
	isNaN(Number(value)) ? 'Must be a number' : undefined
const min = value =>
	value >= 1 ? undefined : 'Must be at least 1 €'
const twoDecimals = value =>
	((value*100 % 1) === 0) ? undefined : 'Must be two decimals maximum' 

let AdjustBoostForm = props => {
	const { handleSubmit } = props;
	return (<form onSubmit={handleSubmit}>
		<div>
			<Field name="boost" label="Boost Value" component={renderField} validate={[number, min, twoDecimals]} type="number" alignLeft/>
		</div>
		<FormButton type="submit" alignLeft>Boost!</FormButton>
	</form>)
}

AdjustBoostForm = reduxForm({
	form: 'form',
	onChange: adjustBoost,
	onSubmit: submitBoost,
	getFormState: ({content}) => content.boost.form
})(AdjustBoostForm)

export default AdjustBoostForm
