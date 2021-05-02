import React, { useEffect, useState } from 'react';
import '../Registration/Registration.css';
import {Link, useHistory} from 'react-router-dom';
import { register } from '../api';

export default function Register() {
    const [error, setError] = useState("");
    let history = useHistory();

    const errorText = error ? <p className="errors">{error}</p> : "";

    const handleSubmit = (event) => {
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value
        
        register(username, email, password)
            .then(response => {
                if(response.token) {
                    localStorage.setItem('token', response.token);
                    history.push(localStorage.getItem('previousPage'));
                    setError("");
                } else if(response.errors) {
                    console.log(response.errors);
                    setError(`Password or email invalid!
                    Username cannot be empty.
                    Password should be 8 characters.
                    Email should be email format (example@example.com).`);
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
            <h1>Register</h1>
            <div className="registrationFormWrapper">
            <div className="registrationForm">
                {errorText}
                <label>Username:</label>
                <input type="text" id="username"/>
                <label>Email:</label>
                <input type="text" id="email"/>
                <label>Password:</label>
                <input type="password" id="password"/>
                <div className="buttonBlock">
                    <button onClick={handleSubmit}>Login</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
            Have an account? Log in <Link to="/login">here</Link>!
            </div>
        </div>
    )
}