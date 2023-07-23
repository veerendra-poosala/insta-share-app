import {Link, withRouter, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
// import {v4 as uuidv4} from 'uuid'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'
import {PrimaryButton} from '../Extras'

const options = {
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
  const [searchValue, setSearchValue] = useState('')
  const [activeOption, setActiveOption] = useState('')
  const [searchToggle, setSearchToggle] = useState(false)
  const [modalMenuOptions, setModalMenuOptions] = useState(
    location.pathname === '/' ? options.home : options.profile,
  )

  const onChangeSearchCaption = event => {
    // console.log(event.target.value)
    setSearchValue(event.target.value)
  }

  const onClickSetActiveOption = event => {
    const selectedOption = event.target.textContent
    setActiveOption(selectedOption)
  }

  useEffect(() => {
    const path = location.pathname
    if (path === '/') {
      setActiveOption(options.home)
    } else if (path === '/profile') {
      setActiveOption(options.profile)
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
              value={searchValue}
              onChange={onChangeSearchCaption}
              data-testid="searchIcon"
            />
            <button className="search-button" type="button">
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
                  activeOption === options.home
                    ? 'option-text active-option'
                    : 'option-text'
                }
              >
                {options.home}
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
                  activeOption === options.profile
                    ? 'option-text active-option'
                    : 'option-text'
                }
              >
                {options.profile}
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
            // offsetX="100%"
            // nested
            // on="hover"
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
                          setModalMenuOptions(options.home)
                        }}
                        className="link-container"
                        to="/"
                      >
                        <p
                          className={
                            modalMenuOptions === options.home
                              ? 'option-text active-option'
                              : 'option-text'
                          }
                        >
                          {options.home}
                        </p>
                      </Link>
                    </li>
                    <li
                      className="option-item-container"
                      onClick={() => {
                        setModalMenuOptions(options.search)
                      }}
                    >
                      <p
                        className={
                          modalMenuOptions === options.search
                            ? 'option-text active-option'
                            : 'option-text'
                        }
                      >
                        {options.search}
                      </p>
                    </li>
                    <li className="option-item-container">
                      <Link
                        onClick={() => {
                          setModalMenuOptions(options.profile)
                        }}
                        className="link-container"
                        to="/profile"
                      >
                        <p
                          className={
                            modalMenuOptions === options.profile
                              ? 'option-text active-option'
                              : 'option-text'
                          }
                        >
                          {options.profile}
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
                  {modalMenuOptions === options.search && (
                    <div className="option-item-container search-mini-width search-element-container">
                      <input
                        type="search"
                        className="search-input-element"
                        placeholder="Search Caption"
                        value={searchValue}
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
