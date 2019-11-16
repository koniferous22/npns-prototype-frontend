import React from 'react'

import TextAreaDiv from '../../styled-components/defaults/TextAreaDiv'

const renderTextArea = ({
	input,
	label,
	type,
	placeholder,
	rows,
	cols,
	
	meta: {touched, error}
}) => (
		<TextAreaDiv>
			<textarea {...input} placeholder={placeholder || label} rows={rows} cols={cols}/>
			{touched && error && <span>{error}</span>}
		</TextAreaDiv>
)

export default renderTextArea
