import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header/index'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Header />
}

export default Home
