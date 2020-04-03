import React from 'react'

import InputDiv from '../../styled-components/form/InputDiv'
import ValidationMessage from '../../styled-components/form/ValidationMessage'

const Input = React.forwardRef(({ name, label, placeholder, type, register, errors, alignLeft }, ref) => (
	<InputDiv alignLeft={alignLeft}>
		<label>{label}</label>
		<input name={name} type={type} ref={ref} placeholder={placeholder || label} />
		{errors[name] && errors[name].type === 'required' && <ValidationMessage>This field is required.</ValidationMessage>}
	</InputDiv>
))

export default Input
