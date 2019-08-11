import React from 'react';
import UserProblems from '../problems/UserProblems'

export default class Profile extends React.Component {
    render() {
        return (
            <div>
                <p>Your profile</p>
                <p>{localStorage.getItem('user')}</p>
                <p>You are a very troubled individual, here are your problems:</p>
                <UserProblems/>
            </div>
        );
    }
}
