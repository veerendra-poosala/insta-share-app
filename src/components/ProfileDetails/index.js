import {useLocation} from 'react-router-dom'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import ReactSlick from '../ReactSlick'

import './index.css'

const ProfileDetails = props => {
  const {profileDetails} = props
  const location = useLocation()
  const path = location?.pathname

  const {
    id,
    followingCount,
    followersCount,
    posts,
    postsCount,
    profilePic,
    stories,
    userBio,
    userId,
    userName,
  } = profileDetails

  // alt for images
  const altForImg = path === '/profile' ? 'my profile' : 'user profile'
  const altForStoryImg = path === '/profile' ? 'my story' : 'user story'
  const altForPostImg = path === '/profile' ? 'my post' : 'user post'

  const userStories = stories?.map(eachStory => ({
    storyUrl: eachStory?.image,
    userId: eachStory?.id,
    // userName: eachStory?.user_name,
  }))
  const renderStories = () => (
    <div className="profile-stories-bg-container">
      <ReactSlick userStories={userStories} slidesToShow={4} profile />
    </div>
  )

  const renderUserPosts = () => (
    <div className="user-profile-posts-preview-bg-container">
      {posts?.length > 0 ? (
        <div className="user-profile-posts-preview-preview-container">
          <div className="user-profile-posts-preview-icon-container">
            <BsGrid3X3 className="user-profile-post-grid-icon" />
            <p className="user-profile-posts-preview-text">Posts</p>
          </div>
          <ul className="user-profile-post-images-preview">
            {posts?.map(post => (
              <li key={post.id} className="user-profile-image-item-container">
                <img
                  className="user-profile-post-image"
                  alt={altForPostImg}
                  src={post.image}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="user-profile-posts-preview-preview-container">
          <div className="user-profile-posts-preview-icon-container">
            <BsGrid3X3 className="user-profile-post-grid-icon" />
            <p className="user-profile-posts-preview-text">Posts</p>
          </div>
          <div className="user-profile-no-posts-view">
            <div className="user-profile-camera-bg-container">
              <BiCamera size={48} />
            </div>
            <h1 className="user-profile-no-posts-text">No Posts Yet</h1>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="profile-details-bg-container">
      <div className="profile-bio-container">
        <h1 className="username user-stats-small">{userName}</h1>
        <div className="user-profile-pic-container">
          <img className="user-profile-pic" alt={altForImg} src={profilePic} />
          <div className="user-stats-container user-stats-small">
            <p className="user-stats-text">
              <span className="user-stats">{postsCount}</span> posts
            </p>
            <p className="user-stats-text">
              <span className="user-stats">{followersCount}</span> followers
            </p>
            <p className="user-stats-text">
              <span className="user-stats">{followingCount}</span> following
            </p>
          </div>
        </div>

        <div className="profile-bio">
          <h1 className="username user-stats-large">{userName}</h1>
          <div className="user-stats-container user-stats-large">
            <p className="user-stats-text">
              <span className="user-stats">{postsCount}</span> posts
            </p>
            <p className="user-stats-text">
              <span className="user-stats">{followersCount}</span> followers
            </p>
            <p className="user-stats-text">
              <span className="user-stats">{followingCount}</span> following
            </p>
          </div>

          <p className="username-small">{userName}</p>
          <p className="bio-text">{userBio}</p>
        </div>
      </div>

      {renderStories()}
      <hr className="horizontal-rule" />
      {renderUserPosts()}
    </div>
  )
}

export default ProfileDetails
