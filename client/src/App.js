import React from 'react'
import { BrowserRouter as Router, Switch, Route, RouteProps, Redirect} from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import HomePage from './pages/HomePage'
import Landing from './pages/landing/Landing'
import './App.css'

export default function App() {
    const isLogin = localStorage.getItem('token');
    const ProtectedRoute = ({ component: Component, path }) => {
        if (!isLogin) {
          return <Redirect to="/" />;
        }
        return <Route component={Component} path={path} />
      };
      const ProtectedRoute2 = ({ component: Component, path }) => {
        if (isLogin) {
          return <Redirect to="/home" />;
        }
        return <Route component={Component} path={path} />
      };
    return (
        <Router>
            <div>
                <Switch>
                    <ProtectedRoute2 exact path="/" component={ Landing } />
                    <ProtectedRoute2 path="/login" component={ Login } />
                    <ProtectedRoute2 path="/register" component={ Register } />
                    <ProtectedRoute path="/home" component={ HomePage } />
                </Switch>
            </div>
        </Router>
    )
}



