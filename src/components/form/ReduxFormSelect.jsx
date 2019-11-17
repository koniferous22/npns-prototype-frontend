import React from 'react'


import ReactSelect from '../../styled-components/form/ReactSelect'

const ReduxFormSelect = props => {
	const { input, options, label, defaultValue, defaultInputValue } = props;
	if (defaultValue) {
		// LOOOOL FIXOL SOM TOOOOOs
		// UPDATE: LEIDER NEIN, FUNKTIONIERT NICHT :D :D
		input.value = defaultValue
	}
	return (
		<div>
			{label && <label>{label}</label>}
			<ReactSelect 
				{...input} 
				onChange={value => {
					input.onChange(value)
				}} 
				onBlur={() => input.onBlur(input.value)} 
				options={options}
				defaultValue={defaultValue}
				defaultInputValue={defaultInputValue}
			/>
		</div>
	)
}

export default ReduxFormSelect