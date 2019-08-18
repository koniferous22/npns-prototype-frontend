import React from 'react'
import { problemActions } from '../../actions/problem-actions'
import { Field, reduxForm } from 'redux-form'

let submit = (values, dispatch, props) => {
    dispatch(problemActions.add({
    	queue_name: props.queueName,
    	submitted_by: localStorage.getItem('userId'),
    	title: values.title,
    	description: values.description
    }))
}

let ProblemAddForm = props => {
    const { handleSubmit } = props;
    return (<form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title</label>
            <Field name="title" component="input" type="text" />
        </div>
        <div>
            <label htmlFor="description">Description</label>
            <Field name="description" component="input" type="text" />
        </div>
        <button type="submit">Submit</button>
    </form>)
}

ProblemAddForm = reduxForm({
    form: 'problemAdd',
    onSubmit: submit
})(ProblemAddForm)

export default ProblemAddForm
