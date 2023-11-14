import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/login/Login'
import Register from './pages/login/Register'
import HomePage from './pages/HomePage'
import Landing from './pages/landing/Landing'
import UserPage from './pages/user/UserPage'
import './App.css'

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ Landing } />
                    <Route path="/login" component={ Login } />
                    <Route path="/register" component={ Register } />
                    <Route path="/home" component={ HomePage } />
                    <Route path="/user" component={ UserPage } />
                </Switch>
        
            </div>
        </Router>
    )
}



