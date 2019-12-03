import React from 'react'
import styled from 'styled-components';

import ThemeSelector from '../ThemeSelector'
import "easymde/dist/easymde.min.css"
import SimpleMDE from "react-simplemde-editor"

const BuzzfeedMarkdownEditor = styled(SimpleMDE)`
	div {
		z-index: 0;
	}
	z-index: 0;

`

const TryhardMarkdownEditor = props => <SimpleMDE {...props} />

const MarkdownEditor = props => <ThemeSelector 
		buzzfeed={<BuzzfeedMarkdownEditor {...props} />} 
		tryhard={<TryhardMarkdownEditor {...props} />} 
	/>

export default MarkdownEditor