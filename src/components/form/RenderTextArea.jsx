import React from 'react'

import TextAreaDiv from '../../styled-components/form/TextAreaDiv'

const renderTextArea = ({
	input,
	label,
	type,
	placeholder,
	rows,
	cols,
	center,
	meta: {touched, error}
}) => (
		<TextAreaDiv center={center}>
			<textarea {...input} placeholder={placeholder || label} rows={rows} cols={cols}/>
			{touched && error && <span>{error}</span>}
		</TextAreaDiv>
)

export default renderTextArea
