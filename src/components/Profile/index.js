import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header/index'
import ProfileDetails from '../ProfileDetails'

const Profile = props => {
  console.log(props)
  return (
    <>
      <Header />
      <ProfileDetails />
    </>
  )
}

export default Profile
