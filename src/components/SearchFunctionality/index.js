import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {apiStatusConstants, PrimaryButton, RenderLoader} from '../Extras'
import PostDetails from '../PostDetails'
import Header from '../Header'
import './index.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      apiStatus: apiStatusConstants.initial,
      userPosts: [],
    }
  }

  componentDidMount() {
    this.fetchUserPosts()
  }

  fetchUserPosts = async () => {
    try {
      this.setState({isLoading: true, apiStatus: apiStatusConstants.inProgress})

      const token = Cookies.get('jwt_token')
      const {match} = this.props
      let {text} = match.params
      // console.log('text', text)
      if (text === 'undefined') {
        text = ''
      }
      const url = `https://apis.ccbp.in/insta-share/posts?search=${text}`
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

        // Update user posts in the context
        this.setState({
          isLoading: false,
          userPosts: [...modifiedUserPosts],
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({isLoading: false, apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({isLoading: false, apiStatus: apiStatusConstants.failure})
      console.log('user posts fetch error', e)
    } finally {
      this.setState({isLoading: false})
    }
  }

  // Render the user stories

  renderUserPosts = () => {
    const {userPosts, isLoading, apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return (
          isLoading && (
            <div className="loader-bg-container">
              <RenderLoader isLoading={isLoading} />
            </div>
          )
        )
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
          <>
            {userPosts?.length > 0 ? (
              <ul className="posts-bg-container">
                {userPosts.map(eachPostDetails => (
                  <PostDetails
                    key={eachPostDetails.postId}
                    eachPostDetails={eachPostDetails}
                  />
                ))}
              </ul>
            ) : (
              <div className="home-no-posts-view">
                <img
                  className="home-no-posts-view-image"
                  alt="search not found"
                  src="https://res.cloudinary.com/v45/image/upload/v1689575508/instaShareProject/searchNotFoundRoute/Group_w4uaxt.jpg"
                />
                <h1 className="home-no-posts-view-heading">Search Not Found</h1>
                <p className="home-no-posts-view-description">
                  Try different keyword or search again
                </p>
              </div>
            )}
          </>
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
          <h1 className="search-results-heading">Search Results</h1>
          {this.renderUserPosts()}
        </div>
      </>
    )
  }
}

export default Search
