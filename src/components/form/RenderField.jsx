import React from 'react'

import InputDiv from '../../styled-components/form/InputDiv'
import ValidationMessage from '../../styled-components/form/ValidationMessage'

const renderField = ({
	input,
	label,
	type,
	placeholder,
	meta: {asyncValidating, touched, error}
}) => (
	<InputDiv>
		{label && <label>{label}</label>}
		<div className={asyncValidating ? 'async-validating' : ''}>
			<input {...input} type={type} placeholder={placeholder || label} />
			{touched && error && <ValidationMessage>{error}</ValidationMessage>}
		</div>
	</InputDiv>
)

export default renderField