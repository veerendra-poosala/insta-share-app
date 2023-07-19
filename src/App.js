import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/profile" component={Profile} />
  </Switch>
)

export default App
