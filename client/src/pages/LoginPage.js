import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import '../App.css'
import {toast} from 'react-hot-toast';

export default function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

   

    const handleLogin = (e) => {
        //connect to api login,localhost:3000/login
        //if success,redirect to home page
        //else,alert error
        //print form input
        e.preventDefault();
        axios.post('http://localhost:8000/login', {
            username: username,
            password: password
        },//with token
        )
        .then((response) => {
            console.log(response);
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            alert("Login successfully");
            setTimeout(() => {
            toast.success("Login successfully");
            console.log("Login successfully");
            window.location.href = '/home';
        }, 1500);
        })
        .catch((error) =>{
            toast.error("Failed to login");
            alert("Failed to login");
            console.log("Failed to login");
        });

    }
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={handleLogin}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="username" required onChange={
                        (e) => {
                            setUsername(e.target.value);
                        }
                    } />
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" required onChange={
                        (e) => {
                            setPassword(e.target.value);
                        }
                    } />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
