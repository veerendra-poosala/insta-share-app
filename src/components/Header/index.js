import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import './index.css'
import {PrimaryButton} from '../Extras'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchCaption = event => {
    // console.log(event.target.value)
    setSearchValue(event.target.value)
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
        <ul className="options-list-for-large-devices">
          <li className="option-item-container search-element-container">
            <input
              type="search"
              className="search-input-element"
              placeholder="Search Caption"
              value={searchValue}
              onChange={onChangeSearchCaption}
            />
            <button className="search-button" type="button">
              <FaSearch className="search-icon" />
            </button>
          </li>
          <li className="option-item-container">
            <Link className="link-container" to="/">
              <p className="option-text">Home</p>
            </Link>
          </li>
          <li className="option-item-container">
            <Link className="link-container" to="/profile">
              <p className="option-text">Profile</p>
            </Link>
          </li>
          <li className="option-item-container">
            <PrimaryButton
              type="button"
              className="header-logout-button"
              actionOnClick={logout}
            >
              Logout
            </PrimaryButton>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
