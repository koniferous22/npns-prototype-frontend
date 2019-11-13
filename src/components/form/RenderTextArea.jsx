import React from 'react'

const renderTextArea = ({
	input,
	label,
	type,
	placeholder,
	rows,
	cols,
	meta: { touched, error, warning }
}) => (
		<div>
			<textarea {...input} placeholder={placeholder || label} rows={rows} cols={cols}/>
				{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
)

export default renderTextArea
