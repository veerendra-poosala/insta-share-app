import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Header from '../Header/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    isLoading: false,
    apiStatus: apiStatusConstants.initial,
    userStories: '',
  }

  componentDidMount() {
    this.fetchUserStories()
  }

  fetchUserStories = async () => {
    try {
      this.setState({isLoading: true})
      const token = Cookies.get('jwt_token')
      const url = 'https://apis.ccbp.in/insta-share/stories'
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log('data', data)
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure, isLoading: false})
      console.log('user stories fetch error', e)
    } finally {
      this.setState({isLoading: false})
    }
  }

  render() {
    return (
      <>
        <Header /> <h1>HOme</h1>{' '}
      </>
    )
  }
}

export default Home
