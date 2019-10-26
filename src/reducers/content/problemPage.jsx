import { reducer } from 'redux-form'
import { combineReducers } from 'redux'

import { problemPageConstants } from "../../constants/content/problemPage"


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
		content:'...'
	},
	replyForm: null
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
		case problemPageConstants.LOAD_PROBLEM_DATA_FAILED:
			return {
				...state,
				message: action.message,
				problem: undefined
			}
		case problemPageConstants.LOAD_REPLY_PAGE_FAILED:
		case problemPageConstants.POST_SUBMISSION_FAILED:
		case problemPageConstants.REPLY_SUBMISSION_FAILED:
		case problemPageConstants.ACCEPT_SUBMISSION_FAILED:
			return {
				...state,
				message: action.message
			}
		case problemPageConstants.LOAD_PROBLEM_DATA_REQUEST:
			return {
				...state, 
				message: "Waiting for problem data"
			}
		case problemPageConstants.LOAD_PROBLEM_DATA_SUCCESS:
			const keep_problem_data = action.problem && state.problem && action.problem.id === state.problem.id
			return {
				...state,
				// has to have || {} otherwise throws error, which I dunno how to solve :D 
				problem: action.problem || {},
				paging: keep_problem_data ? state.paging : defaultPaging,
				submissionEntries: keep_problem_data ? state.submissionEntries : [],
				message: ""
			}
		case problemPageConstants.LOAD_SUBMISSION_PAGE_REQUEST:
			return {
				...state,
				message: "Loading more submissions"
			}
		case problemPageConstants.LOAD_SUBMISSION_PAGE_SUCCESS:
			const activePage = (!action.activePage || action.activePage <= 1) ? 1 : action.activePage
			newSubmissionEntries[activePage - 1] = transformEntries(action.data.map(x => ({...x, replyEntries: [], repliesHidden: true})))
			newPaging.page = (action.data && action.data.length > 0) ? activePage : state.paging.page
			newPaging.hasMore = action.hasMore
			Object.assign(newPaging, transformEntries(createPagingState(action.data)))
			return {
				...state,
				submissionEntries: newSubmissionEntries.slice(0,activePage),
				paging: newPaging,
				message: ""
			}
		case problemPageConstants.LOAD_SUBMISSION_PAGE_FAILED:
			newPaging.hasMore = false
			return {
				...state,
				message: action.message,
				paging: newPaging
					
			}
		case problemPageConstants.LOAD_REPLY_PAGE_REQUEST:
			return {
				...state,
				message: "Loading more replies"
			}
		case problemPageConstants.LOAD_REPLY_PAGE_SUCCESS:
			const activeReplyPage = (!action.activeReplyPage || action.activeReplyPage <= 1) ? 1 : action.activeReplyPage
			submission.replyEntries[activeReplyPage - 1] = action.data
			submission.replyEntries = submission.replyEntries.slice(0, activeReplyPage)

			if (!newPaging[action.submission]) {
				newPaging[action.submission] = {}
			}
			newPaging[action.submission].page = (action.data && action.data.length > 0) ? activeReplyPage : newPaging[action.submission].page
			newPaging[action.submission].hasMore = action.hasMore
			return {
				...state,
				submissionEntries: newSubmissionEntries,
				paging: newPaging,
				message: ""
			}
		case problemPageConstants.POST_SUBMISSION_REQUEST:
			return {
				...state,
				message: "Posting submission"
			}
		case problemPageConstants.POST_SUBMISSION_SUCCESS:
			if (newSubmissionEntries.length === 0) {
				newSubmissionEntries.push({})
			}
			newSubmissionEntries[newSubmissionEntries.length - 1][action.submission._id] = {...action.submission, replyEntries: [], repliesHidden: true, _id:undefined}
			Object.assign(newPaging, transformEntries(createPagingState([action.submission])))
			return {
				...state,
				submissionEntries: newSubmissionEntries,
				message: ""
			}
		case problemPageConstants.REPLY_SUBMISSION_REQUEST:
			return {
				...state,
				message: "Posting reply"
			}
		case problemPageConstants.REPLY_SUBMISSION_SUCCESS:
			if (submission.replyEntries.length === 0) {
				submission.replyEntries.push({})
			}
			submission.replyEntries[submission.replyEntries.length - 1][action.reply._id] = {...action.reply, _id:undefined}
			return {
				...state,
				submissionEntries: newSubmissionEntries,
				message: ""
			}

		case problemPageConstants.ACCEPT_SUBMISSION_REQUEST:
			return {
				...state,
				message: 'Marking as solved'
			}
		case problemPageConstants.ACCEPT_SUBMISSION_SUCCESS:
			submission['accepted'] = true
			state.problem.accepted_submission = action.submission
			return {
				...state,
				message: ""
			}
		case problemPageConstants.SELECT_REPLY_FORM:
			return {
				...state,
				replyForm: action.replyForm,
				message: ""
			}
		default:
			return state

	}
}

export default combineReducers({
	page: problemPageReducer,
	form: reducer
})