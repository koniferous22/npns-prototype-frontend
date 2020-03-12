import React from 'react'
import { connect } from 'react-redux'

import EditForm from './EditForm'
import Button from '../../../styled-components/defaults/Button'

const mapStateToProps = (state, ownProps) => ({
	user: state.auth.user,
	edit: state.content.edit
})

class Editing extends React.Component {
	constructor(props) {
		super(props)
		this.state = {showEditForm: false}
	}
	/*ten dementny if navyse som tam hodil lebo mi hadzalo ze user je undefined error */
	render() {
		if(this.props.user) {				
			if(this.props.ownerId === this.props.user._id) {
				return (
					<div>
						<Button onClick={()=>{this.setState({showEditForm: !this.state.showEditForm})}}>
							Update
						</Button>
						{!this.props.edit.editFormSubmitted && this.state.showEditForm && <EditForm contentId={this.props.contentId} token={this.props.token} />}
					</div>
				)
			}
			else {
				return(<div></div>)
			}
		}
		else {
			return(<div></div>)
		}
	}
}

export default connect(mapStateToProps)(Editing)
