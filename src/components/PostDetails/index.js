import React from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {FaRegComment, FaShareAlt} from 'react-icons/fa'
import './index.css'

const PostDetails = props => {
  const {eachPostDetails} = props
  const {
    comments,
    createdAt,
    likesCount,
    postDetails,
    postId,
    profilePic,
    userId,
    userName,
  } = eachPostDetails

  const {image_url: postImageUrl, caption} = postDetails
  const formattedComments = comments.map(comment => ({
    comment: comment.comment,
    commentedUserId: comment.user_id,
    commentedUserName: comment.user_name,
  }))

  const [likeStatus, setLikeStatus] = React.useState(false)
  const [postLikesCount, setPostLikesCount] = React.useState({
    postLikesCount: likesCount,
  })
  // const likeStatus = true
  const postLikeStatus = async () => {
    try {
      const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
      const token = Cookies.get('jwt_token')
      const likeObj = {
        like_status: !likeStatus,
      }

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({
          like_status: !likeStatus,
        }),
      }
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        setLikeStatus(data.message === 'Post has been liked')
        if (data.message === 'Post has been liked') {
          setPostLikesCount(prev => ({
            ...prev,
            postLikesCount: prev.postLikesCount + 1,
          }))
        } else {
          setPostLikesCount(prev => ({
            ...prev,
            postLikesCount: prev.postLikesCount - 1,
          }))
        }
      }
    } catch (e) {
      console.log('like status error', e)
    }
  }

  return (
    <li className="post-item-bg-container">
      <div className="post-profile-pic-container">
        <img
          className="post-profile-pic"
          alt="post author profile"
          src={profilePic}
        />
        <h1 className="post-creator-name">{userName}</h1>
      </div>
      <img className="post-image" alt="post" src={postImageUrl} />
      <div className="post-text-card">
        <div className="post-icons-container">
          <button
            onClick={postLikeStatus}
            className="icon-button"
            type="button"
            data-testid="likeIcon"
          >
            {likeStatus === true ? (
              <FcLike className="like-icon" />
            ) : (
              <BsHeart className="like-icon" />
            )}
          </button>
          <button className="icon-button" type="button" data-testid="likeIcon">
            <FaRegComment size={24} />
          </button>
          <button className="icon-button" type="button" data-testid="likeIcon">
            <BiShareAlt size={24} />
          </button>
        </div>
        <p className="likes-count">{postLikesCount.postLikesCount} likes</p>
        <p className="caption">{caption}</p>
        <ul className="comments-list">
          {formattedComments.map(comment => (
            <li key={comment.commentedUserId} className="comment-item">
              <p className="comment-text">
                <span className="comment-user">
                  {comment.commentedUserName}
                </span>{' '}
                {comment.comment}
              </p>
            </li>
          ))}
        </ul>
        <p className="time">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostDetails
