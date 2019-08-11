import React from 'react';
import Problems from './Problems'
import ProblemAddForm from './ProblemAddForm'

export default class ProblemIndex extends React.Component {
    render() {
        var queueId = this.props.location.pathname.split("/") //bere URL
        return (
            <div>
                <h3>Problem Index</h3>
                <Problems id={queueId[2]}/>
                <p>u got a problem? post it down below</p>
                <ProblemAddForm queueId={queueId[2]}/>
            </div>
        );
    }
}
