import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import login from '../../assets/images/login.png'
import './login.css'


export const Login = () => {
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
            .catch((error) => {
                toast.error("Failed to login");
                alert("Failed to login");
                console.log("Failed to login");
            });

    }
    return (
        <div className="loginContainer">
            <div className="login-left">
                <img src={login}></img>
                <div className="img-text">
                    <h2>We take your English higher</h2>
                    <p>EICT is simply!</p>
                </div>
            </div>

            <div className="login-right">
                <h4>Welcome to EICT...!</h4>
                <div className="option">
                    <div className="login visited">Login</div>
                    <div className="register">Register</div>
                </div>
                <p className='desc'>EICT is a learning-platform for student to sutdy English effectively.<br></br> Login to join our community</p>
                <form onSubmit={handleLogin}>
                    <p>
                        <label>Username</label><br />
                        <input className='inputText' type="text" name="username" required onChange={
                            (e) => {
                                setUsername(e.target.value);
                            }
                        } />
                    </p>
                    <p>
                        <label>Password</label>
                        <br />
                        <input className='inputText' type="password" name="password" required onChange={
                            (e) => {
                                setPassword(e.target.value);
                            }
                        } />
                    </p>
                    <div className="form-bottom">
                        <div className="">
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                            <label for="vehicle1" className='remember'> Remember me</label><br></br>

                        </div>
                        <div className="forgot-pwd"> Forgot Password?</div>
                    </div>
                    <p>
                        <button id="sub_btn" type="submit">Login</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login