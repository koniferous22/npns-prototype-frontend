import { problemPageConstants } from "../../constants/content/problemPage"

const defaultState = {
	entries: [],
	active: {
		page: 0,
	},
	problem: {

	},
	reply_form: null
}

export default function problemPageReducer(state = defaultState, action) {
	const findContentInEntries = (entries, contentId) => {
		for (i = 0; i< entries.length; ++i) {
			if (entries[i][contentId]) {
				entries[i][contentId]
			}
		}
		return undefined;
	}
	const transformEntries = (entries) => {
		const transformed_entries = {}
		entries.map(entry => {
			transformed_entries[entry._id] = {...entry, _id:undefined}
		})
		return transformed_entries
	}

	const newEntries = state.entries
	switch (action.type) {
		case problemPageConstants.LOAD_PROBLEM_DATA_FAILED:
		case problemPageConstants.LOAD_SUBMISSION_PAGE_FAILED:
		case problemPageConstants.LOAD_REPLY_PAGE_FAILED:
		case problemPageConstants.POST_SUBMISSION_FAILED:
		case problemPageConstants.REPLY_SUBMISSION_FAILED:
		case problemPageConstants.ACCEPT_SUBMISSION_FAILED:
			return {
				...state
				message: action.message
			}
		case problemPageConstants.LOAD_PROBLEM_DATA_REQUEST:
			return {
				...state, 
				message: "Waiting for problem data"
			}
		case problemPageConstants.LOAD_PROBLEM_DATA_SUCCESS:
			return {
				...state,
				problem: action.problem
			}
		case problemPageConstants.LOAD_SUBMISSION_PAGE_REQUEST:
			return {
				...state,
				message: "Loading more submissions"
			}
		case problemPageConstants.LOAD_SUBMISSION_PAGE_SUCCESS: {
			const activePage = (!action.activePage || action.activePage <= 1) ? 1 : action.activePage
			newEntries[activePage - 1] = transformEntries(action.data)
			return {
				...state,
				entries: newEntries.slice(0,activePage),
			}
		}
		case problemPageConstants.POST_SUBMISSION_REQUEST:
			return {
				...state,
				message: "Posting submission"
			}
		case problemPageConstants.POST_SUBMISSION_SUCCESS:
			newEntries[newEntries.length - 1].push(action.submission)
			return {
				...state,
				entries: newEntries
			}
		case problemPageConstants.REPLY_SUBMISSION_REQUEST:
			return {
				...state,
				message: "Posting reply"
			}
		case problemPageConstants.REPLY_SUBMISSION_SUCCESS:
			const submission = findContentInEntries(newEntries, action.submission)
			submission.entries[submission.entries.length - 1].push(action.reply)
			return {
				...state,
				entries: newEntries
			}

		case problemPageConstants.ACCEPT_SUBMISSION_REQUEST:
			return {
				...state,
				message: 'Marking as solved'
			}
		case problemPageConstants.ACCEPT_SUBMISSION_SUCCESS:
			const submission = findContentInEntries(newEntries, action.submission)
			submission['accepted'] = true
			state.problem.accepted_submission = action.submission
			return {
				...state,
			}
		case problemPageConstants.SELECT_REPLY_FORM:
		return {
			...state,
			reply_form: action.submission
		}
		default:
			return state

	}
}