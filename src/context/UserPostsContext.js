import React from 'react'

const UserPostsContext = React.createContext({
  userPosts: [],
  updateUserPosts: () => {},
  isLoading: false,
  updateIsLoading: () => {},
  apiStatus: '',
  updateApiStatus: () => {},
})

export default UserPostsContext
