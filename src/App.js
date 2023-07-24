import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import UserPostsContext from './context/UserPostsContext'

const App = () => {
  const [userPosts, setUserPosts] = React.useState([])

  const updateUserPosts = arr => {
    setUserPosts([...arr])
  }
  return (
    <UserPostsContext.Provider
      value={{
        userPosts,
        updateUserPosts,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </UserPostsContext.Provider>
  )
}
export default App
