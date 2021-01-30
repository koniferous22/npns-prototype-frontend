import React from 'react'

import InputDiv from '../../styled-components/form/InputDiv'
import ValidationMessage from '../../styled-components/form/ValidationMessage'

const Input = React.forwardRef(({ name, label, placeholder, type, register, onBlur, errors, alignLeft }, ref) => (
	<InputDiv alignLeft={alignLeft}>
		<label>{label}</label>
		<div>
			<input name={name} type={type} onBlur={onBlur} ref={ref} placeholder={placeholder || label} />
		</div>
		{errors[name] && errors[name].type === 'required' && <ValidationMessage>This field is required.</ValidationMessage>}
		{errors[name] && errors[name].type === 'validate' && <ValidationMessage>Invalid {name}</ValidationMessage>}
	</InputDiv>
))

export default Input