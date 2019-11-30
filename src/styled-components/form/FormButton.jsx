import React from 'react'
import styled from 'styled-components';

import StyledButton from '../defaults/Button'

import ThemeSelector from '../ThemeSelector'

export const BuzzfeedFormButton = styled(StyledButton)`
	${props => props.alignLeft ? 'margin-left: 10%' : 'margin-left: 10px'};
`

export const TryhardFormButton = props => <button {...props} alignLeft={undefined}/>

const FormButton = props => {console.log('FORMBUTTON');console.log(props);return (<ThemeSelector 
		buzzfeed={<BuzzfeedFormButton {...props} />} 
		tryhard={<TryhardFormButton {...props} />} 
	/>)}

export default FormButton