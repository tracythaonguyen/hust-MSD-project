import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios';
import register from '../../assets/images/register.png'
import './login.css'


export const Register = () => {
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
                if (response.data.status === 'error') {
                    console.log("Failed to register");
                } else {
                    setTimeout(() => {
                        console.log("Register successfully");
                        window.location.href = '/login';
                    }, 2500);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="loginContainer">
            <div className="login-left">
                <img src={register} alt={"Register Image"}></img>
                <div className="img-text">
                    <h2>We take your English higher</h2>
                    <p>EICT is simply!</p>
                </div>
            </div>

            <div className="login-right">
                <h4>Welcome to EICT...!</h4>
                <div className="option">
                    <Link to='/login'>
                        <div className="login ">Login</div>
                    </Link>
                    <div className="register visited">Register</div>
                </div>
                <p className='desc'>EICT is a learning-platform for student to study English
                    effectively.<br></br> Register account to join our community</p>
                <form onSubmit={handleRegister}>
                    <p>
                        <label>Username</label><br/>
                        <input className='inputText' type="text" name="first_name" onChange={
                            (e) => {
                                setUsername(e.target.value);
                            }
                        } required/>
                    </p>

                    <p>
                        <label>Password</label><br/>
                        <input className='inputText' type="password" name="password" onChange={
                            (e) => {
                                setPassword(e.target.value);
                            }
                        } required/>
                    </p>

                    <p>
                        <label>Email address</label><br/>
                        <input className='inputText' type="email" name="email" onChange={
                            (e) => {
                                setEmail(e.target.value);
                            }
                        } required/>
                    </p>
                    <p>
                        <label>Phone number</label><br/>
                        <input className='inputText' type="phone" name="phone" onChange={
                            (e) => {
                                setPhone(e.target.value);
                            }
                        } required/>
                    </p>

                    <p>
                        <input type="checkbox" name="checkbox" id="checkbox" required/>
                        <span>I agree all statements in <a href="https://google.com" target="_blank"
                                                           rel="noopener noreferrer">terms of service</a></span>.
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Register</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register