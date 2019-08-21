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
            console.log(keys) //to stopPropagation() je nutne, lebo inak sa onClick spusti pre viac komponent
            return (
                <div>
                    <ul>
                        {keys.map(k => (
                            <li key={k} onClick={(e) => {this.props.changeOnScreenQueue(k); e.stopPropagation()}}>
                                {k}
                                <QueueSidebarEntries queues={this.props.queues[k]} changeOnScreenQueue={this.props.changeOnScreenQueue}/>   
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

//Z nejakeho dovodu to stale hadze Index nech klikam kdekolvek do zoznamu...
