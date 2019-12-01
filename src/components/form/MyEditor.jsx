import React from "react"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

//konfiguracia: https://github.com/Ionaru/easy-markdown-editor#configuration
class MyEditor extends React.Component {
	render() {
		return (
			<div>
				{this.props.input && <SimpleMDE options={{spellChecker: false}} onChange={this.props.input.onChange} />}
			</div>
		)
	}
}

export default MyEditor
