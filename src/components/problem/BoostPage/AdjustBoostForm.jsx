import React from 'react'
import { submitBoost, adjustBoost } from '../../../store/content/boost'
import { Field, reduxForm } from 'redux-form'

import FormButton from '../../../styled-components/form/FormButton'
import renderField from '../../form/RenderField'

const submitBoostCb = (values, dispatch, props) => {
	dispatch(submitBoost({value: values.boost}))
}
const adjustBoostCb = (values, dispatch, props) => {
	dispatch(adjustBoost({value: values.boost}))
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
	onChange: adjustBoostCb,
	onSubmit: submitBoostCb,
	getFormState: ({content}) => content.boost.form
})(AdjustBoostForm)

export default AdjustBoostForm
