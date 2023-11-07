import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/login/Login'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Landing from './pages/landing/Landing'
import './App.css'

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ Landing } />
                    <Route path="/login" component={ Login } />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/home" component={ HomePage } />
                </Switch>
        
            </div>
        </Router>
    )
}



