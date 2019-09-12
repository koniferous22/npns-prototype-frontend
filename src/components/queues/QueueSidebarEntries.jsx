import React from 'react';

const QueueSidebarEntries = ({queues}) => {
    const keys = Object.keys(queues);
    return (
        <ul>
            {keys.map(k => (
                <li key={k}>
                    {k}
                    <QueueSidebarEntries queues={queues[k]}/>
                </li>
            ))}
        </ul>
    );
}

export default QueueSidebarEntries