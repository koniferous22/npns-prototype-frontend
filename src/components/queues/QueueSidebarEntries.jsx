import React from 'react';
//import { Link } from "react-router-dom"
import history from '../../history'

const QueueSidebarEntries = ({queues, setActiveQueue}) => {
    const keys = Object.keys(queues);
    return (
        <ul>
            {keys.map(k => (
                <li key={k}>
                    {
                    //<Link to={'/q/' + k}>{k}</Link>
                    }
                    <div onClick={() => {
                        history.push('/q/' + k)
                        setActiveQueue(k)}
                    }>{k}</div>
                    <QueueSidebarEntries queues={queues[k]} setActiveQueue={setActiveQueue}/>
                </li>
            ))}
        </ul>
    );
}

export default QueueSidebarEntries