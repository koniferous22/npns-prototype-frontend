import { reducer } from 'redux-form'
import { combineReducers } from 'redux'

import { fetchData, messageType } from '../../utils'

const LOAD_PROBLEM_DATA_REQUEST = "PROBLEM_PAGE_LOAD_PROBLEM_DATA_REQUEST"
const LOAD_PROBLEM_DATA_SUCCESS = "PROBLEM_PAGE_LOAD_PROBLEM_DATA_SUCCESS"
const LOAD_PROBLEM_DATA_FAILED = "PROBLEM_PAGE_LOAD_PROBLEM_DATA_FAILED"

const LOAD_SUBMISSION_PAGE_REQUEST = "PROBLEM_PAGE_LOAD_SUBMISSION_PAGE_REQUEST"
const LOAD_SUBMISSION_PAGE_FAILED = "PROBLEM_PAGE_LOAD_SUBMISSION_PAGE_FAILED"
const LOAD_SUBMISSION_PAGE_SUCCESS = "PROBLEM_PAGE_LOAD_SUBMISSION_PAGE_SUCCESS"

const LOAD_REPLY_PAGE_REQUEST = "PROBLEM_PAGE_LOAD_REPLY_PAGE_REQUEST"
const LOAD_REPLY_PAGE_FAILED = "PROBLEM_PAGE_LOAD_REPLY_PAGE_FAILED"
const LOAD_REPLY_PAGE_SUCCESS = "PROBLEM_PAGE_LOAD_REPLY_PAGE_SUCCESS"

const HIDE_REPLIES = "PROBLEM_PAGE_HIDE_REPLIES"

const POST_SUBMISSION_REQUEST = "PROBLEM_PAGE_POST_SUBMISSION_REQUEST"
const POST_SUBMISSION_FAILED = "PROBLEM_PAGE_POST_SUBMISSION_FAILED"
const POST_SUBMISSION_SUCCESS = "PROBLEM_PAGE_POST_SUBMISSION_SUCCESS"

const REPLY_SUBMISSION_REQUEST = "PROBLEM_PAGE_REPLY_SUBMISSION_REQUEST"
const REPLY_SUBMISSION_FAILED = "PROBLEM_PAGE_REPLY_SUBMISSION_FAILED"
const REPLY_SUBMISSION_SUCCESS = "PROBLEM_PAGE_REPLY_SUBMISSION_SUCCESS"

const ACCEPT_SUBMISSION_REQUEST = "PROBLEM_PAGE_ACCEPT_SUBMISSION_REQUEST"
const ACCEPT_SUBMISSION_FAILED = "PROBLEM_PAGE_ACCEPT_SUBMISSION_FAILED"
const ACCEPT_SUBMISSION_SUCCESS = "PROBLEM_PAGE_ACCEPT_SUBMISSION_SUCCESS"

const EDIT_REQUEST = "PROBLEM_PAGE_EDIT_REQUEST"
const EDIT_FAILED = "PROBLEM_PAGE_EDIT_FAILED"
const EDIT_SUCCESS = "PROBLEM_PAGE_EDIT_SUCCESS"

const SELECT_REPLY_FORM = "PROBLEM_PAGE_SELECT_REPLY_FORM"
const RESET = "PROBLEM_PAGE_RESET_PAGES"

const defaultPaging = {
	page: 0,
	hasMore: true
}

const defaultState = {
	submissionEntries: [
	],
	paging: defaultPaging,
	problem: {
		title:'...',
		content:'...',
		submitted_by: null,
		active: null
	},
	reply: null,
	submissionFormSubmitted: false
}

function problemPageReducer(state = defaultState, action) {
	const findContentInEntries = (entries, contentId) => {
		for (var i = 0; i < entries.length; ++i) {
			if (entries[i][contentId]) {
				return entries[i][contentId]
			}
		}
		return undefined;
	}
	const transformEntries = (entries) => {
		entries = entries ? entries : []
		const transformed_entries = {}
		entries.forEach(entry => {
			transformed_entries[entry._id] = {...entry, _id:undefined}
		})
		return transformed_entries
	}
	const createPagingState = (submissions) => {
		return submissions.map(submission => {
			return ({
				_id: submission._id,
				page: 0,
				hasMore: submission.replies.length > 0
			})
		})
	}

	const newSubmissionEntries = state.submissionEntries
	const newPaging = {...state.paging}
	const submission = (action.submission) ? findContentInEntries(newSubmissionEntries, action.submission) : null
	switch (action.type) {
		case LOAD_PROBLEM_DATA_FAILED:
			return {
				...state,
				message: action.message,
				messageType: action.messageType,
				problem: undefined
			}
		case LOAD_REPLY_PAGE_FAILED:
		case POST_SUBMISSION_FAILED:
		case REPLY_SUBMISSION_FAILED:
		case ACCEPT_SUBMISSION_FAILED:
			return {
				...state,
				message: action.message,
				messageType: action.messageType
			}
		case LOAD_PROBLEM_DATA_REQUEST:
			return {
				...state, 
				message: "Waiting for problem data",
				messageType: action.messageType
			}
		case LOAD_PROBLEM_DATA_SUCCESS:
			const keep_problem_data = action.problem && state.problem && action.problem.id === state.problem.id
			return {
				...state,
				// has to have || {} otherwise throws error, which I dunno how to solve :D 
				problem: action.problem || {},
				paging: keep_problem_data ? state.paging : defaultPaging,
				submissionEntries: keep_problem_data ? state.submissionEntries : [],
				message: "",
				messageType: action.messageType
			}
		case LOAD_SUBMISSION_PAGE_REQUEST:
			return {
				...state,
				message: "Loading more submissions",
				messageType: action.messageType
			}
		case LOAD_SUBMISSION_PAGE_SUCCESS:
			const activePage = (!action.activePage || action.activePage <= 1) ? 1 : action.activePage
			newSubmissionEntries[activePage - 1] = transformEntries(action.data.map(x => ({...x, replyEntries: [], repliesHidden: true})))
			newPaging.page = (action.data && action.data.length > 0) ? activePage : state.paging.page
			newPaging.hasMore = action.hasMore
			Object.assign(newPaging, transformEntries(createPagingState(action.data)))
			return {
				...state,
				submissionEntries: newSubmissionEntries.slice(0,activePage),
				paging: newPaging,
				message: "",
				messageType: action.messageType
			}
		case LOAD_SUBMISSION_PAGE_FAILED:
			newPaging.hasMore = false
			return {
				...state,
				message: action.message,
				messageType: action.messageType,
				paging: newPaging
					
			}
		case LOAD_REPLY_PAGE_REQUEST:
			return {
				...state,
				message: "Loading more replies",
				messageType: action.messageType
			}
		case LOAD_REPLY_PAGE_SUCCESS:
			const activeReplyPage = (!action.activeReplyPage || action.activeReplyPage <= 1) ? 1 : action.activeReplyPage
			submission.replyEntries[activeReplyPage - 1] = action.data || []
			submission.replyEntries = submission.replyEntries.slice(0, activeReplyPage)
			submission.repliesHidden = false

			if (!newPaging[action.submission]) {
				newPaging[action.submission] = {}
			}
			newPaging[action.submission].page = (action.data && action.data.length > 0) ? activeReplyPage : newPaging[action.submission].page
			newPaging[action.submission].hasMore = action.hasMore
			return {
				...state,
				submissionEntries: newSubmissionEntries,
				paging: newPaging,
				message: "",
				messageType: action.messageType
			}
		case POST_SUBMISSION_REQUEST:
			return {
				...state,
				message: "Posting submission",
				messageType: action.messageType
			}
		case POST_SUBMISSION_SUCCESS:
			if (newSubmissionEntries.length === 0) {
				newSubmissionEntries.push({})
			}
			newSubmissionEntries[newSubmissionEntries.length - 1][action.submission._id] = {...action.submission, replyEntries: [], repliesHidden: true, _id:undefined}
			Object.assign(newPaging, transformEntries(createPagingState([action.submission])))
			return {
				...state,
				submissionEntries: newSubmissionEntries,
				paging: newPaging,
				submissionFormSubmitted: true,
				message: "",
				messageType: action.messageType
			}
		case REPLY_SUBMISSION_REQUEST:
			return {
				...state,
				message: "Posting reply",
				messageType: action.messageType
			}
		case REPLY_SUBMISSION_SUCCESS:
			if (submission.replyEntries.length === 0) {
				submission.replyEntries.push({})
			}
			submission.repliesHidden = false
			submission.replyEntries[submission.replyEntries.length - 1][action.reply._id] = {...action.reply, _id:undefined}
			return {
				...state,
				submissionEntries: newSubmissionEntries,
				message: "",
				messageType: action.messageType,
				reply: null
			}
		case ACCEPT_SUBMISSION_REQUEST:
			return {
				...state,
				message: 'Marking as solved',
				messageType: action.messageType
			}
		case ACCEPT_SUBMISSION_SUCCESS:
			state.problem.accepted_submission = {...submission, _id: action.submission}
			return {
				...state,
				message: "",
				messageType: action.messageType
			}
		case SELECT_REPLY_FORM:
			return {
				...state,
				reply: (action.reply === state.reply) ? null : action.reply,
				message: "",
				messageType: action.messageType
			}
		case HIDE_REPLIES:
			submission.repliesHidden = true
			newPaging[action.submission] = defaultPaging
			return {
				...state,
				submissionEntries: newSubmissionEntries,
				paging: newPaging
			}
		case RESET:
			return defaultState
		default:
			return state
	}
}

export default combineReducers({
	page: problemPageReducer,
	form: reducer
})

export const loadProblemData = (problemId) => {
	const request = () => ({ type: LOAD_PROBLEM_DATA_REQUEST })
	const success = (problem) => ({type: LOAD_PROBLEM_DATA_SUCCESS, problem})
	const failure = (message) => ({type: LOAD_PROBLEM_DATA_FAILED, message, messageType: messageType.ERROR})

	if (!problemId) {
		return failure('No Problem specified')
	}

	return fetchData(
		"/problem/" + problemId,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		request,
		success,
		failure
	)
}

export const loadSubmissionPage = (problemId, activePage) => {
	const request = () => ({ type: LOAD_SUBMISSION_PAGE_REQUEST, problemId })
	const success = (data, hasMore) => ({ type: LOAD_SUBMISSION_PAGE_SUCCESS, activePage, data, hasMore })
	const failure = (message) => ({type: LOAD_SUBMISSION_PAGE_FAILED, message, messageType: messageType.ERROR})

	if (!problemId) {
		return failure('No Problem specified')
	}

	return fetchData(
		"/problem/" + problemId + "/submissions",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		request,
		({ data, hasMore }) => success(data, hasMore),
		failure
	)
}

export const loadReplyPage = (submissionId, activePage) => {
	const request = () => ({ type: LOAD_REPLY_PAGE_REQUEST })
	const success = (submission, activeReplyPage, data, hasMore) => ({ type: LOAD_REPLY_PAGE_SUCCESS, submission, activeReplyPage, data, hasMore })
	const failure = (message) => ({type: LOAD_REPLY_PAGE_FAILED, message, messageType: messageType.ERROR})

	if (!submissionId) {
		return failure('No submission specified')
	}
	
	return fetchData(
		"/submission/" + submissionId + "/replies",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		request,
		({ data, hasMore }) => success(submissionId, activePage, data,hasMore),
		failure
	)
}

export const postSubmission = (submission, token) => {
	const request = () => ({ type: POST_SUBMISSION_REQUEST })
	const success = (submission) => ({type: POST_SUBMISSION_SUCCESS, submission})
	const failure = (message) => ({type: POST_SUBMISSION_FAILED, message, messageType: messageType.ERROR})

	if (!submission) {
		return failure('No submission specified')
	}

	return fetchData(
		"/problem/" + submission.problem + "/submit",
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify(submission)
		},
		request,
		success,
		failure
	)
}

export const replySubmission = (reply, token) => {
	const request = () => ({ type: REPLY_SUBMISSION_REQUEST })
	const success = (submission, reply) => ({ type: REPLY_SUBMISSION_SUCCESS, submission, reply })
	const failure = (message) => ({type: REPLY_SUBMISSION_FAILED, message, messageType: messageType.ERROR})

	if (!reply) {
		return failure('No reply specified')
	}
	return fetchData(
		"/submission/" + reply.submission + "/reply",
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify(reply)
		},
		request,
		(response) => success(response.submission, response),
		failure
	)
}

export const acceptSubmission = (submission, problem, token) => {
	const request = () => ({ type: ACCEPT_SUBMISSION_REQUEST })
	const success = () => ({ type: ACCEPT_SUBMISSION_SUCCESS, submission })
	const failure = (message) => ({type: ACCEPT_SUBMISSION_FAILED, message, messageType: messageType.ERROR})

	if (!submission) {
		return failure('No submission specified')
	}
	if (!problem) {
		return failure('No problem specified')
	}

	return fetchData(
		"/problem/" + problem + "/mark_solved",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		request,
		success,
		failure
	)
}

export const selectReplyForm = (submission) => ({
	type: SELECT_REPLY_FORM,
	reply: submission
})

export const hideReplies = (submission) => ({
	type: HIDE_REPLIES,
	submission
})

export const edit = (edit, token) => {
	const request = () => ({ type: EDIT_REQUEST })
	const success = () => ({type: EDIT_SUCCESS, edit})
	const failure = (message) => ({type: EDIT_FAILED, message, messageType: messageType.ERROR})
	
	console.log(edit)
	if (!edit.edit) {
		return failure('No edit specified')
	}

	fetchData(
		"/content/" + edit.contentId + "/edit",
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
			body: JSON.stringify(edit)
		},
		request,
		success,
		failure
	)
}


export const reset = () => ({
	type: RESET
})

// EDIT REDUCER
/*
const editReducer = (state = initialState, action) => {
	switch (action.type) {
		case EDIT_REQUEST:
			return {message: "Submitting edit"}
		case EDIT_SUCCESS:
			return {message: "Edit submitted", messageType: action.messageType, edit: action.edit, editFormSubmitted: true}
		case EDIT_FAILED:
			return {message: action.error, messageType: action.messageType}
		default:
			return state
	}
}


*/