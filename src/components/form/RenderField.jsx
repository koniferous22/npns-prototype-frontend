import React from 'react'

const renderField = ({
	input,
	label,
	type,
	placeholder,
	meta: {asyncValidating, touched, error}
}) => (
	<div>
		<label>{label}</label>
		<div className={asyncValidating ? 'async-validating' : ''}>
			<input {...input} type={type} placeholder={placeholder || label} />
			{touched && error && <span>{error}</span>}
		</div>
	</div>
)

export default renderField