import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import HomePage from './pages/HomePage.jsx'
import Landing from './pages/landing/Landing'
import UserPage from './pages/user/UserPage'
import VideoPage from './pages/video/VideoPage.jsx'
import History from './pages/history/History.jsx'
import Favourite from './pages/favourite/Favourite.jsx'
import RecordPage from './pages/user/RecordPage.jsx'
import './App.css'
import VideoListPage from "./pages/videoList/VideoListPage";
import { UserProvider } from './components/UserContext.js'

// test Ci/cd
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
    <UserProvider>
      <Router>
        <div>
          <Switch>
            {/* <ProtectedRoute2 exact path="/" component={ Landing } />
                    <ProtectedRoute2 path="/login" component={ Login } />
                    <ProtectedRoute2 path="/register" component={ Register } />
                    <ProtectedRoute path="/home" component={ HomePage } />
                    <ProtectedRoute path="/user" component={ UserPage } />
                    <ProtectedRoute path="/topic" component={ SearchPage } /> */}
            <ProtectedRoute2 exact path="/" component={Landing} />
            <ProtectedRoute2 path="/login" component={Login} />
            <ProtectedRoute2 path="/register" component={Register} />
            <ProtectedRoute path="/home" component={HomePage} />
            <ProtectedRoute path="/user" component={UserPage} />
            {/*<ProtectedRoute path="/topic" component={ SearchPage } />*/}
            {/*Search video page*/}
            <ProtectedRoute path="/videoList" component={VideoListPage} />

            <ProtectedRoute path="/video" component={VideoPage} />
            <ProtectedRoute path="/history" component={History} />
            <ProtectedRoute path="/favourite" component={Favourite} />
            <ProtectedRoute path="/record" component={RecordPage} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  )
}
