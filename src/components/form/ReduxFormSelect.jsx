import React from 'react'


import ReactSelect from '../../styled-components/form/ReactSelect'

const ReduxFormSelect = props => {
	const { input, options, label, defaultValue, defaultInputValue } = props;
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
