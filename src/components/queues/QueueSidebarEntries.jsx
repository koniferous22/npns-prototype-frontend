import React from 'react';

export default class QueueSidebarEntries extends React.Component {
    render() {
        var {queues} = this.props;
        const keys = Object.keys(queues);
        return (
            <div>
                {(queues) ?
                    <ul>
                        {keys.map(k => (
                            <li key={k}>
                                {k}
                                <QueueSidebarEntries queues={this.props.queues[k]}/>
                            </li>
                        ))}
                    </ul> :
                    <span>loading queue entry</span>
                }
            </div>
        );
    }
}

