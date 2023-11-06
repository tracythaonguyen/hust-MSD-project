import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import axios from 'axios';
import { useState } from 'react'


export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/register', {
            username: username,
            password: password,
            email: email,
            phone: phone
        })
        .then((response) => {
            console.log(response);
            if(response.data.status === 'error'){
                console.log("Failed to register");
            }else{
                    setTimeout(() => {
                    console.log("Register successfully");
                    window.location.href = '/login';
                }, 2500);
            }
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleRegister}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" onChange={
                        (e) => {
                            setUsername(e.target.value);
                        }
                    } required />
                </p>

                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" onChange={
                        (e) => {
                            setPassword(e.target.value);
                        }
                    } required />
                </p>
                
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" onChange={
                        (e) => {
                            setEmail(e.target.value);
                        }
                    } required />
                </p>
                <p>
                    <label>Phone number</label><br/>
                    <input type="phone" name="phone" onChange={
                        (e) => {
                            setPhone(e.target.value);
                        }
                    } required />
                </p>
                
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/login">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
