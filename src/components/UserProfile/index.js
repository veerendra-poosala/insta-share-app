import Cookies from 'js-cookie'
import {Component} from 'react'
import {Link} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
import Header from '../Header/index'
import {apiStatusConstants} from '../Home/index'
import {RenderLoader, PrimaryButton} from '../Extras'
import ProfileDetails from '../ProfileDetails'
import '../Profile/index.css'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myProfileDetails: {},
      isLoading: false,
      apiStatus: apiStatusConstants.initial,
    }
  }

  componentDidMount() {
    this.fetchMyProfileDetails()
  }

  fetchMyProfileDetails = async () => {
    try {
      this.setState({isLoading: true, apiStatus: apiStatusConstants.inProgress})
      const token = Cookies.get('jwt_token')
      const {match} = this.props
      const userId = match.params.id

      const url = `https://apis.ccbp.in/insta-share/users/${userId}`
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const formattedMyProfileData = {
          id: data?.user_details.id,
          followingCount: data?.user_details.following_count,
          followersCount: data?.user_details.followers_count,
          posts: data?.user_details.posts,
          postsCount: data?.user_details.posts_count,
          profilePic: data?.user_details.profile_pic,
          stories: data?.user_details.stories,
          userBio: data?.user_details.user_bio,
          userId: data?.user_details.user_id,
          userName: data?.user_details.user_name,
        }

        this.setState({
          myProfileDetails: {...formattedMyProfileData},
          isLoading: false,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({isLoading: false, apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({isLoading: false, apiStatus: apiStatusConstants.failure})
      console.log('my profile fetch error', e)
    } finally {
      this.setState({isLoading: false})
    }
  }

  render() {
    const {isLoading, apiStatus, myProfileDetails} = this.state
    const {match} = this.props
    const {id} = match.params
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="profile-bg-container">
            <Header />
            {isLoading && (
              <div className="loader-bg-container">
                <RenderLoader isLoading={isLoading} />
              </div>
            )}
          </div>
        )
      case apiStatusConstants.success:
        return (
          <div className="profile-bg-container">
            <Header />
            <ProfileDetails profileDetails={myProfileDetails} />
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="profile-bg-container">
            <Header />
            <div className="profile-failure-view-bg-container">
              <img
                className="profile-failure-view-image"
                alt="failure-view"
                src="https://res.cloudinary.com/v45/image/upload/v1689575789/instaShareProject/searchNotFoundRoute/Group_7522_k02spr.png"
              />
              <h1 className="profile-failure-view-text">
                Something went wrong. Please try again
              </h1>
              <Link to={`/users/${id}`} style={{textDecoration: 'none'}}>
                <PrimaryButton type="button">Try Again</PrimaryButton>
              </Link>
            </div>
          </div>
        )
      default:
        return null
    }
  }
}

export default UserProfile
