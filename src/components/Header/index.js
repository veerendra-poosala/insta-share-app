import {Link, withRouter, useLocation} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'
import UserPostsContext from '../../context/UserPostsContext'
import {PrimaryButton} from '../Extras'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const menuOptions = {
  home: 'Home',
  profile: 'Profile',
  search: 'Search',
}

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const location = useLocation()
  const [searchInput, setSearchInput] = useState('')
  const [activeOption, setActiveOption] = useState('')
  const [searchToggle, setSearchToggle] = useState(false)
  const [modalMenuOptions, setModalMenuOptions] = useState(
    location.pathname === '/' ? menuOptions.home : menuOptions.profile,
  )

  const onChangeSearchCaption = event => {
    setSearchInput(event.target.value)
  }

  const {
    userPosts,
    updateUserPosts,
    isLoading,
    updateIsLoading,
    apiStatus,
    updateApiStatus,
  } = useContext(UserPostsContext)

  const fetchUserPosts = async () => {
    try {
      updateIsLoading(true)
      updateApiStatus(apiStatusConstants.inProgress)
      const token = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
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

        updateUserPosts([...modifiedUserPosts])
        updateApiStatus(apiStatusConstants.success)
      } else {
        updateApiStatus(apiStatusConstants.failure)
      }
    } catch (e) {
      updateApiStatus(apiStatusConstants.failure)
      console.log('user posts fetch error', e)
    } finally {
      updateIsLoading(false)
    }
  }

  const onClickSetActiveOption = event => {
    const selectedOption = event.target.textContent
    setActiveOption(selectedOption)
  }

  useEffect(() => {
    const path = location.pathname
    if (path === '/') {
      setActiveOption(menuOptions.home)
    } else if (path === '/profile') {
      setActiveOption(menuOptions.profile)
    } else {
      setActiveOption('')
    }
  }, [location.pathname])

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
              value={searchInput}
              onChange={onChangeSearchCaption}
              data-testid="searchIcon"
            />
            <button
              className="search-button"
              type="button"
              onClick={fetchUserPosts}
            >
              <FaSearch className="search-icon" />
            </button>
          </li>
          <li className="option-item-container">
            <Link
              onClick={onClickSetActiveOption}
              className="link-container"
              to="/"
            >
              <p
                className={
                  activeOption === menuOptions.home
                    ? 'option-text active-option'
                    : 'option-text'
                }
              >
                {menuOptions.home}
              </p>
            </Link>
          </li>
          <li className="option-item-container">
            <Link
              onClick={onClickSetActiveOption}
              className="link-container"
              to="/profile"
            >
              <p
                className={
                  activeOption === menuOptions.profile
                    ? 'option-text active-option'
                    : 'option-text'
                }
              >
                {menuOptions.profile}
              </p>
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
        <div className="options-list-for-small-device">
          <Popup
            menu
            position="bottom right"
            contentStyle={{
              padding: '0px',
              border: 'none',
              width: '100%',
              marginTop: '15px',
              display: 'flex',
              paddingLeft: '20px',
              paddingRight: '10px',
              boxShadow: '0px 5px 5px -5px #bfbfbf',
              boxSizing: 'border-box',
            }}
            arrow={false}
            trigger={
              <button type="button" className="menu-pop-up-button">
                <FiMenu className="menu-icon" />
              </button>
            }
          >
            {close => {
              const updateSearchOption = () => {
                setSearchToggle(!searchToggle)
              }
              return (
                <div className="modal-bg-container">
                  <ul className="modal-options-container">
                    <li className="option-item-container">
                      <Link
                        onClick={() => {
                          setModalMenuOptions(menuOptions.home)
                        }}
                        className="link-container"
                        to="/"
                      >
                        <p
                          className={
                            modalMenuOptions === menuOptions.home
                              ? 'option-text active-option'
                              : 'option-text'
                          }
                        >
                          {menuOptions.home}
                        </p>
                      </Link>
                    </li>
                    <li
                      className="option-item-container"
                      onClick={() => {
                        setModalMenuOptions(menuOptions.search)
                      }}
                    >
                      <p
                        className={
                          modalMenuOptions === menuOptions.search
                            ? 'option-text active-option'
                            : 'option-text'
                        }
                      >
                        {menuOptions.search}
                      </p>
                    </li>
                    <li className="option-item-container">
                      <Link
                        onClick={() => {
                          setModalMenuOptions(menuOptions.profile)
                        }}
                        className="link-container"
                        to="/profile"
                      >
                        <p
                          className={
                            modalMenuOptions === menuOptions.profile
                              ? 'option-text active-option'
                              : 'option-text'
                          }
                        >
                          {menuOptions.profile}
                        </p>
                      </Link>
                    </li>
                    <li className="option-item-container">
                      <PrimaryButton
                        type="button"
                        className="header-logout-button"
                        actionOnClick={logout}
                        style={{height: '30px'}}
                      >
                        Logout
                      </PrimaryButton>
                    </li>
                    <li className="option-item-container">
                      <button
                        type="button"
                        onClick={close}
                        className="close-button"
                      >
                        <AiFillCloseCircle size="30px" />
                      </button>
                    </li>
                  </ul>
                  {modalMenuOptions === menuOptions.search && (
                    <div className="option-item-container search-mini-width search-element-container">
                      <input
                        type="search"
                        className="search-input-element"
                        placeholder="Search Caption"
                        value={searchInput}
                        onChange={onChangeSearchCaption}
                        data-testid="searchIcon"
                      />
                      <button className="search-button" type="button">
                        <FaSearch className="search-icon" />
                      </button>
                    </div>
                  )}
                </div>
              )
            }}
          </Popup>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
