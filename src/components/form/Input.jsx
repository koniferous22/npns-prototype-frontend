import React from 'react'

import InputDiv from '../../styled-components/form/InputDiv'
import ValidationMessage from '../../styled-components/form/ValidationMessage'

const Input = ({ name, label, placeholder, type, register, errors, required, alignLeft }) => (
  <InputDiv alignLeft={alignLeft}>
    <label>{label}</label>
    <input name={name} type={type} ref={register({ required })} placeholder={placeholder || label} />
		{errors[name] && errors[name].type === 'required' && <ValidationMessage>This field is required.</ValidationMessage>}  </InputDiv>
)

export default Input
