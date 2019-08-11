import React from 'react';

export default class Entries extends React.Component {
    constructor(props) {
    super(props);
    }
    componentDidMount() {
    }
    render() {
        var {queues} = this.props;
        if(!queues) {
            return (
                <div></div> //THIS IS NECESSARY TO LOAD PROPERLY
            );
        } else {
            const keys = Object.keys(queues)
            console.log(queues)
            return (
                <div>
                <ul>
                    {keys.map(k => (
                        <div>
                        {k}
                        <p><Entries queues={this.props.queues[k]}/></p>
                        </div>
                    ))}
                </ul>
                </div>
            );
// to if else riesi problem s undefined errormi!!! 

        }
    }
}
