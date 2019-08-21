import React from 'react';
import Problems from './Problems'
import ProblemAddForm from './ProblemAddForm'

export default class ProblemIndex extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

    	// reimplement using redux

        return (
            <div>
                <h3>Problem Index</h3>
                <Problems queueName={this.props.queueName}/>
                <p>u got a problem? post it down below</p>
                <ProblemAddForm queueName={this.props.queueName}/>
            </div>
        );
    }
}
