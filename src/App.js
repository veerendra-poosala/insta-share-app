import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import UserPostsContext from './context/UserPostsContext'
import UserProfile from './components/UserProfile'
import PageNotFound from './components/PageNotFound/index'

const App = () => {
  const [userPosts, setUserPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [apiStatus, setApiStatus] = React.useState('')

  const updateUserPosts = arr => {
    setUserPosts([...arr])
  }
  const updateIsLoading = bool => {
    setIsLoading(bool)
  }
  const updateApiStatus = status => {
    setApiStatus(status)
  }
  return (
    <UserPostsContext.Provider
      value={{
        userPosts,
        updateUserPosts,
        isLoading,
        updateIsLoading,
        apiStatus,
        updateApiStatus,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        <Route path="/not-found" component={PageNotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </UserPostsContext.Provider>
  )
}
export default App
