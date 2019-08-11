import React from 'react';
import Queues from './Queues'
import Problems from '../problems/Problems'

export default class QueueIndex extends React.Component {
    render() {
        return (
            <div>
                <p>Politically correct Queues</p>
                <Queues />
            </div>
        );
    }
}
