// Login.js
import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'

import ThemeContext from '../../Context/ThemeContext'
import './index.css'

const lightTheme = {
  background: '#fff',
  color: '#000',
  inputBackground: '#f0f0f0',
  buttonBackground: '#007bff',
  buttonColor: '#ffffff',
}

const darkTheme = {
  background: '#181818',
  color: '#fff',
  inputBackground: '#333',
  buttonBackground: '#007bff',
  buttonColor: '#ffffff',
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({theme}) => theme.inputBackground};
`

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Button = styled.button`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 4px;
  background-color: ${({theme}) => theme.buttonBackground};
  color: ${({theme}) => theme.buttonColor};
  cursor: pointer;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`
const Para = styled.p`
  color: red;
  font-family: Roboto;
  font-size: 0.85em;
`

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password, errorMsg: ''}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  handleInputName = event => {
    this.setState({username: event.target.value})
  }

  handleInputPassword = event => {
    this.setState({password: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {username, password, showPassword, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {({isLightTheme}) => {
          const currentTheme = isLightTheme ? lightTheme : darkTheme

          return (
            <ThemeProvider theme={currentTheme}>
              <Container>
                <Form onSubmit={this.onSubmitForm}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                  <label htmlFor='username'>USERNAME</label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.handleInputName}
                    id='username'
                  />
                  <label htmlFor='password'>PASSWORD</label>
                  <Input
                  id='password'
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleInputPassword}
                  />
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={this.toggleShowPassword}
                    />
                    Show Password
                  </CheckboxLabel>
                  <Button type="submit" onClick={this.handleLogin}>
                    Login
                  </Button>
                  {errorMsg && <Para>* {errorMsg}</Para>}
                </Form>
              </Container>
            </ThemeProvider>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
