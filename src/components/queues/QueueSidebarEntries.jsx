import React from 'react';

export default class QueueSidebarEntries extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {queues} = this.props;
        if(!queues) {
            return (
                <div></div>
            );
        } else {
            const keys = Object.keys(queues)
            return (
                <div>
                    <ul>
                        {keys.map(k => (
                            <li key={k}>
                                {k}
                                <QueueSidebarEntries queues={this.props.queues[k]}/>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}
