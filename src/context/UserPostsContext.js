import React from 'react'

const UserPostsContext = React.createContext({
  userPosts: [],
  updateUserPosts: () => {},
})

export default UserPostsContext
