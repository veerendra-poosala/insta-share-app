import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Slider from 'react-slick'

import Header from '../Header/index'
import {RenderLoader} from '../Extras'
import ReactSlick from '../ReactSlick'
import './index.css'

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
      if (response.ok) {
        const modifiedUserStories = data?.users_stories?.map(story => ({
          storyUrl: story?.story_url,
          userId: story?.user_id,
          userName: story?.user_name,
        }))
        this.setState({
          userStories: [...modifiedUserStories],
          isLoading: false,
        })
      } else {
        this.setState({isLoading: false})
      }
    } catch (e) {
      this.setState({isLoading: false})
      console.log('user stories fetch error', e)
    } finally {
      this.setState({isLoading: false})
    }
  }

  renderStories = () => {
    const {userStories, isLoading} = this.state
    return (
      <>
        {isLoading === true ? (
          <div className="stories-bg-container">
            <RenderLoader isLoading={isLoading} />
          </div>
        ) : (
          <div className="stories-bg-container">
            {userStories?.length > 0 && (
              <ReactSlick userStories={userStories} />
            )}
          </div>
        )}
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">{this.renderStories()}</div>
      </>
    )
  }
}

export default Home
