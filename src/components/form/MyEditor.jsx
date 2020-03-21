import React from "react"
//import SimpleMDE from "react-simplemde-editor"
//import "easymde/dist/easymde.min.css"
import MarkdownEditor from '../../styled-components/form/MarkdownEditor'

//konfiguracia: https://github.com/Ionaru/easy-markdown-editor#configuration
const MyEditor = ({ input }) => {
	return (
		<div>
			{input && <MarkdownEditor options={{spellChecker: false}} onChange={input.onChange} style={{zIndex: '0'}}/>}
		</div>
	)
}

export default MyEditor
