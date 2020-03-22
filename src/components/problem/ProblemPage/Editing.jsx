import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import EditForm from './EditForm'
import Button from '../../../styled-components/defaults/Button'

const Editing = ({ ownerId, contentId, token }) => {
	const [showEditForm, setShowEditForm] = useState(false)
	const user = useSelector(state => state.auth.user)
	const edit = useSelector(state => state.content.edit)

	/*ten dementny if navyse som tam hodil lebo mi hadzalo ze user je undefined error */
	if(user) {				
		if(ownerId === user._id) {
			return (
				<div>
					<Button onClick={() => setShowEditForm(!showEditForm)}>
						Update
					</Button>
					{!edit.editFormSubmitted && showEditForm && <EditForm contentId={contentId} token={token} />}
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

export default Editing
