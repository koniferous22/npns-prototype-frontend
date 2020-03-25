import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import SubmitProblemForm from './SubmitProblemPage/SubmitProblemForm'
import { submitProblemStages, fetchDropdownValues, reset } from '../../store/content/submitProblemPage'
import MarkdownRender from '../form/MarkdownRender'
import AttachmentUpload from '../upload/AttachmentUpload'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

const SubmitProblemPage = ({ urlQueue, loggedIn, token }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchDropdownValues())
		return () => {
			dispatch(reset())
		};
	}, [dispatch]);

	const { page } = useSelector(state => state.content.submitProblem)
	const { form } = useSelector(state => state.content.submitProblem.form)
	const { attachmentUpload } = useSelector(state => state.content)

	switch(page.stage) {
		case submitProblemStages.COMPLETED:
			return(
				<ContentDiv>
					<BackendMessage messageType={page.messageType}>
						{page.message}
					</BackendMessage>
					<p>Would you like to check out <Link to={'/problem/' + page.problemId}>your submitted problem</Link> or the <Link to={'/q/' + page.queue}>{page.queue} queue</Link>?</p>
				</ContentDiv>
			)
		case submitProblemStages.SUBMITTING_FORM:
		default:
			return(
				<ContentDiv>
					<CenteredDiv>
						Submitting new problem
					</CenteredDiv>
					<SubmitProblemForm 
						defaultQueue={urlQueue || 'Index'} 
						token={token} 
						queueOptions={page.queueOptions}
						attachmentUrls={attachmentUpload.urls}
					/>
					<CenteredDiv>
						<BackendMessage messageType={page.messageType}>
							{page.message}
						</BackendMessage>
					</CenteredDiv>
					{
						form && form.values && (
							<div>
								{(form.values.title || form.values.description) && <p>Preview</p>}
								<h3>{form.values.title}</h3>
								<MarkdownRender source={form.values.description} />
							</div>
						)
					}
					<AttachmentUpload />
				</ContentDiv>
			)
	}
}

export default SubmitProblemPage
