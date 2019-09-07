import React from 'react';
import Problems from './Problems'
import ProblemAddForm from './ProblemAddForm'
import QueueSidebar from '../queues/QueueSidebar'

export default class ProblemIndex extends React.Component {
    render() {

    	// reimplement using redux

        var queueName = this.props.location.pathname.split("/")[2]
        return (
            <div>
                <QueueSidebar />
                
                <h3>Problem Index</h3>
                <Problems name={queueName}/>
                <p>u got a problem? post it down below</p>
                <ProblemAddForm queueName={queueName}/>
            </div>
        );
    }
}
