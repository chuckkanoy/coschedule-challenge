import React, { useState } from 'react';
import '../Registration/Registration.css';
import {Link, useHistory} from 'react-router-dom';
import { login } from '../api';

export default function Login() {
    const [error, setError] = useState("");
    let history = useHistory();

    const errorText = error ? <p className="errors">{error}</p> : "";

    const handleSubmit = (event) => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value
        
        login(email, password)
            .then(response => {
                if(response.token) {
                    localStorage.setItem('token', response.token);
                    history.push(localStorage.getItem('previousPage'));
                    setError("");
                } else if(response.errors) {
                    setError(`Password or email invalid!
                    Password should be 8 characters
                    Email should be email format (example@example.com)`);
                } else {
                    setError(response.msg);
                }
            })
    }

    const handleCancel = () => {
        history.push(localStorage.getItem('previousPage'));
    }

    return (
        <div className="registrationWrapper">
            <h1>Login</h1>
            <div className="registrationFormWrapper">
            <div className="registrationForm">
                {errorText}
                <label>Email:</label>
                <input type="text" id="email"/>
                <label>Password:</label>
                <input type="password" id="password"/>
                <div className="buttonBlock">
                    <button onClick={handleSubmit}>Login</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
            Don't have an account? Make one <Link to="/register">here</Link>!
            </div>
        </div>
    )
}