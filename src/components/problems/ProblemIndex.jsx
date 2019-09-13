import React from 'react';
import { connect } from 'react-redux'

import Problems from './Problems'
import ProblemAddForm from './ProblemAddForm'
import QueueSidebar from '../queues/QueueSidebar'
import { globalActions } from '../../actions/global'

const mapDispatchToProps = dispatch => ({
    setActiveQueue: (queue) => dispatch(globalActions.setActiveQueue(queue))
})

class ProblemIndex extends React.Component {
    componentDidMount() {
        this.props.setActiveQueue(this.props.queue)
    }
    render() {
        const queue = this.props.queue
        return (
            <div>
                <QueueSidebar />
                <h3>{"Problems of queue: " + queue}</h3>
                <Problems name={queue}/>
                <p>u got a problem? post it down below</p>
                <ProblemAddForm queue={queue}/>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(ProblemIndex)