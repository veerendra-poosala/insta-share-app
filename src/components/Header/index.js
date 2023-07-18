import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-nav-container">
      <div className="website-logo-container">
        <Link to="/" className="link-container">
          <img
            className="header-website-logo"
            alt="website logo"
            src="https://res.cloudinary.com/v45/image/upload/v1689618508/Standard_Collection_8_1_gev4v9.png"
          />
          <h1 className="header-website-name">Insta Share</h1>
        </Link>
      </div>
      <div className="header-options-bg-container">
        <h1>hello</h1>
      </div>
    </nav>
  )
}

export default withRouter(Header)
