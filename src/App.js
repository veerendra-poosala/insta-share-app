import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import Home from './components/Home'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute path="/bad-path" component={PageNotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
