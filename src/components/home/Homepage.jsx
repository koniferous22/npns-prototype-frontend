import React from 'react';
import HomepageLabel from './HomepageLabel'
import ProblemIndex from '../problems/ProblemIndex'
import QueueSidebar from '../queues/QueueSidebar'

export default class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onScreenQueue: 'Index'
            }
        this.changeOnScreenQueue = this.changeOnScreenQueue.bind(this)
    }
    changeOnScreenQueue(newOnScreenQueue) {
        const onScreenQueue = newOnScreenQueue
        this.setState({onScreenQueue})
    }
  	render() {
	    return (
	    	<div>
       			<p>Homepage friend</p>
       			<HomepageLabel />
	    		<QueueSidebar changeOnScreenQueue={this.changeOnScreenQueue}/>
                <ProblemIndex queueName={this.state.onScreenQueue}/>
       		</div>
    	);
  	}
}
