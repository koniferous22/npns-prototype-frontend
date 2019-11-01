
import { appConfig } from '../../appConfig'
import { problemPageConstants } from '../../constants/content/problemPage'

function loadProblemData(problemId) {
	const request = () => ({ type: problemPageConstants.LOAD_PROBLEM_DATA_REQUEST })
	const success = (problem) => ({type: problemPageConstants.LOAD_PROBLEM_DATA_SUCCESS, problem})
	const failure = (message) => ({type: problemPageConstants.LOAD_PROBLEM_DATA_FAILED, message})

	if (!problemId) {
		return dispatch => {}        
	}

	return dispatch => {
		dispatch(request())
		const requestUrl = appConfig.backendUrl + "/problem/" + problemId
		fetch(requestUrl, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {
			dispatch(success(body))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}

}

function loadSubmissionPage(problemId, activePage) {
	const request = () => ({ type: problemPageConstants.LOAD_SUBMISSION_PAGE_REQUEST, problemId })
	const success = (data, hasMore) => ({ type: problemPageConstants.LOAD_SUBMISSION_PAGE_SUCCESS, activePage, data, hasMore })
	const failure = (message) => ({type: problemPageConstants.LOAD_SUBMISSION_PAGE_FAILED, message})

	return dispatch => {
		dispatch(request())
		var requestUrl = appConfig.backendUrl + "/problem/" + problemId + "/submissions"
		requestUrl += (activePage && activePage > 0) ? "?page=" + activePage : ""
		fetch(requestUrl, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {        
			dispatch(success(body.data, body.hasMore))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

function loadReplyPage(submissionId, activePage) {
	const request = () => ({ type: problemPageConstants.LOAD_REPLY_PAGE_REQUEST })
	const success = (submission, activeReplyPage, data, hasMore) => ({ type: problemPageConstants.LOAD_REPLY_PAGE_SUCCESS, submission, activeReplyPage, data, hasMore })
	const failure = (message) => ({type: problemPageConstants.LOAD_REPLY_PAGE_FAILED, message})

	return dispatch => {
		dispatch(request())
		var requestUrl = appConfig.backendUrl + "/submission/" + submissionId + "/replies"
		requestUrl += (activePage && activePage > 0) ? "?page=" + activePage : ""
		fetch(requestUrl, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {        
			dispatch(success(submissionId, activePage, body.data, body.hasMore))
		}).catch(error => {
			dispatch(failure(error))
		})   
	}
}

function postSubmission(submission, token) {
	const request = () => ({ type: problemPageConstants.POST_SUBMISSION_REQUEST })
	const success = (submission) => ({type: problemPageConstants.POST_SUBMISSION_SUCCESS, submission})
	const failure = (message) => ({type: problemPageConstants.POST_SUBMISSION_FAILED, message})

	return dispatch => {
		dispatch(request())
		const requestUrl = appConfig.backendUrl + "/problem/" + submission.problem + "/submit"
		fetch(requestUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify(submission)
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {
			dispatch(success(body))
		}).catch(error => {
			dispatch(failure(error))
		})
	}
}

function replySubmission(reply, token) {
	const request = () => ({ type: problemPageConstants.REPLY_SUBMISSION_REQUEST })
	const success = (submission, reply) => ({ type: problemPageConstants.REPLY_SUBMISSION_SUCCESS, submission, reply })
	const failure = (message) => ({type: problemPageConstants.REPLY_SUBMISSION_FAILED, message})

	return dispatch => {
		dispatch(request())
		const requestUrl = appConfig.backendUrl + "/submission/" + reply.submission + "/reply"
		fetch(requestUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify(reply)
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {        
			dispatch(success(body.submission, body))
		}).catch(error => {
			dispatch(failure(error))
		})
	}
}

function acceptSubmission(submission, problem, token) {
	const request = () => ({ type: problemPageConstants.ACCEPT_SUBMISSION_REQUEST })
	const success = () => ({ type: problemPageConstants.ACCEPT_SUBMISSION_SUCCESS, submission })
	const failure = (message) => ({type: problemPageConstants.ACCEPT_SUBMISSION_FAILED, message})

	return dispatch => {
		dispatch(request())
		console.log('ACCCCCEPTTING')
		console.log(submission)
		const requestUrl = appConfig.backendUrl + "/problem/" + problem + "/mark_solved"
		fetch(requestUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify({
				submission
			})
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {        
			dispatch(success())
		}).catch(error => {
			dispatch(failure(error))
		})	
	}
}

function selectReplyForm(submission) {
	return {
		type: problemPageConstants.SELECT_REPLY_FORM,
		replyForm: submission
	}
}

function reset() {
	return {
		type: problemPageConstants.RESET
	}
}

export const problemPageActions = {
	loadProblemData,
	loadSubmissionPage,
	loadReplyPage,
	postSubmission,
	replySubmission,
	acceptSubmission,
	selectReplyForm,
	reset
}