import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import Search from './components/SearchFunctionality'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <ProtectedRoute exact path="/search/:text" component={Search} />
    <Route path="/bad-path" component={PageNotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
