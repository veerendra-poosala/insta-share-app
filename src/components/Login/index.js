import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import {PrimaryButton} from '../Extras/index'

import './index.css'

class Login extends Component {
  state = {
    showErrorMsg: false,
    errorMsg: '',
    username: '',
    password: '',
  }

  onSuccessfulLoginSubmission = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  handleLoginFormSubmit = async event => {
    event.preventDefault()
    try {
      const {username, password} = this.state
      const userDetails = {username, password}
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (data.jwt_token !== undefined) {
        this.onSuccessfulLoginSubmission(data.jwt_token)
        this.setState({showErrorMsg: false})
      } else {
        const errorMsg = data.error_msg
        this.setState({showErrorMsg: true, errorMsg})
      }
    } catch (e) {
      console.log('Login error', e)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="form-field-container">
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          className="text-input-element"
          id="username"
          onChange={this.onChangeUsername}
          value={username}
          placeholder="Username"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="form-field-container">
        <label htmlFor="password" className="label-text">
          password
        </label>
        <input
          type="password"
          className="text-input-element"
          id="password"
          onChange={this.onChangePassword}
          value={password}
          placeholder="Password"
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-route-bg-container">
        <div className="login-route-landing-image-container">
          <img
            className="login-route-landing-image"
            alt="website login"
            src="https://res.cloudinary.com/v45/image/upload/v1689574130/instaShareProject/loginRoute/Layer_2_3x_aerufg.png"
          />
        </div>
        <div className="form-bg-container">
          <form
            className="login-form-container"
            onSubmit={this.handleLoginFormSubmit}
          >
            <div className="form-heading-container">
              <img
                className="website-logo-login-route"
                alt="website logo"
                src="https://res.cloudinary.com/v45/image/upload/v1689618508/Standard_Collection_8_1_gev4v9.png"
              />
              <h1 className="login-route-main-heading">Insta Share</h1>
              {this.renderUsername()}
              {this.renderPassword()}
              <div className="form-field-container error-msg-container">
                {showErrorMsg && <p className="error-msg">{errorMsg} </p>}
              </div>
              <div className="form-field-container">
                <PrimaryButton type="submit">Login</PrimaryButton>
                {/* 
                <button type="submit" className="login-button">
                  <p className="button-text">Login</p>
                </button>
                */}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
