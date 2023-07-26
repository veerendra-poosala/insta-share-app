import Cookies from 'js-cookie'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Header from '../Header/index'
import {RenderLoader, PrimaryButton} from '../Extras'
import ReactSlick from '../ReactSlick'
import './index.css'
import PostDetails from '../PostDetails'
import '../Profile/index.css'

export const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    isLoading: false,
    apiStatus: apiStatusConstants.initial,
    userStories: [],
    userPosts: [],
  }

  componentDidMount() {
    this.fetchUserStories()
    this.fetchUserPosts()
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

  fetchUserPosts = async () => {
    try {
      this.setState({isLoading: true, apiStatus: apiStatusConstants.inProgress})
      const token = Cookies.get('jwt_token')
      const url = 'https://apis.ccbp.in/insta-share/posts'
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const modifiedUserPosts = data?.posts?.map(eachPost => ({
          comments: eachPost.comments,
          createdAt: eachPost.created_at,
          likesCount: eachPost.likes_count,
          postDetails: eachPost.post_details,
          postId: eachPost.post_id,
          profilePic: eachPost.profile_pic,
          userId: eachPost.user_id,
          userName: eachPost.user_name,
        }))

        this.setState({
          userPosts: [...modifiedUserPosts],
          apiStatus: apiStatusConstants.success,
          isLoading: false,
        })
      } else {
        this.setState({isLoading: false, apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({isLoading: false, apiStatus: apiStatusConstants.failure})
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

  renderUserPosts = () => {
    const {userPosts, apiStatus, isLoading} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          isLoading && (
            <div className="loader-bg-container">
              <RenderLoader isLoading={isLoading} />
            </div>
          )
        )
      case apiStatusConstants.success:
        return (
          <ul className="posts-bg-container">
            {userPosts.map(eachPostDetails => (
              <Link
                key={eachPostDetails.postId}
                to={`/users/${eachPostDetails.userId}`}
                style={{textDecoration: 'none'}}
              >
                <PostDetails eachPostDetails={eachPostDetails} />
              </Link>
            ))}
          </ul>
        )
      case apiStatusConstants.failure:
        return (
          <div className="profile-failure-view-bg-container">
            <img
              className="profile-failure-view-image"
              alt="failure-view"
              src="https://res.cloudinary.com/v45/image/upload/v1690384555/alert-triangle_vzl7rv.jpg"
            />
            <h1 className="profile-failure-view-text">
              Something went wrong. Please try again
            </h1>
            <Link to="/" style={{textDecoration: 'none'}}>
              <PrimaryButton type="button">Try Again</PrimaryButton>
            </Link>
          </div>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          {this.renderStories()}
          {this.renderUserPosts()}
        </div>
      </>
    )
  }
}

export default Home
