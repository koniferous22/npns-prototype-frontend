import React from 'react';
import { useSelector } from 'react-redux';

import MarkdownRender from '../../form/MarkdownRender'
import PostSubmissionForm from './PostSubmissionForm'
import AttachmentUpload from '../../upload/AttachmentUpload'

const PostSubmissionComponent = ({ problemId, token }) => {
	const sForm = useSelector(state => state.content.problemPage.form.submission)
	const attachmentUpload = useSelector(state => state.content.attachmentUpload)
	return (
		<div>
			<PostSubmissionForm token={token} problem={problemId} attachmentUrls={attachmentUpload.urls} />
			{
				sForm && sForm.values && (
					<div>
						{(sForm.values.content) && <p>Preview</p>}
						<MarkdownRender source={sForm.values.content} />
					</div>
				)
			}
			<AttachmentUpload />
		</div>
	)
}


export default PostSubmissionComponent
