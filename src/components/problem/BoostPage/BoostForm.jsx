import React from 'react'
import { boostActions } from '../../../actions/content/boost'
import { Field, reduxForm } from 'redux-form'

let boost = (values, dispatch, props) => {
	dispatch(
		boostActions
			.boost( //zmenit obsah tohoto
				{
					problemId: props.problemId,
					boost: values.boost
				},
				props.token
			)
	)
}

let BoostForm = props => {
	const { handleSubmit } = props;
	return (<form onSubmit={handleSubmit}>
		<div>
			<label htmlFor="boost">Boost value</label>
			<Field name="boost" component="input" type="text" />//ide tu zmenit type?
		</div>
		<button type="submit">Boost!</button>
	</form>)
}

BoostForm = reduxForm({
	form: 'form',
	onSubmit: submit,
	getFormState: ({content}) => content.boost.form
})(BoostForm)

export default BoostForm
