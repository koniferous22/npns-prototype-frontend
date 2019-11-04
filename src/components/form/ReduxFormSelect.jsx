import React from 'react'

import Select from 'react-select';

const ReduxFormSelect = props => {
	const { input, options, label, defaultValue, defaultInputValue } = props;
	if (defaultValue) {
		// LOOOOL FIXOL SOM TOOOOO
		input.value = defaultValue
	}
	return (
		<div>
			{label && <label>{label}</label>}
			<Select 
				{...input} 
				onChange={value => input.onChange(value)} 
				onBlur={() => input.onBlur(input.value)} 
				options={options}
				defaultValue={defaultValue}
				defaultInputValue={defaultInputValue}
			/>
		</div>
	)
}

export default ReduxFormSelect