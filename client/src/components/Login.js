import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login Component</h1>
        <input type="button" onClick={this.logIn} value="Log In with Google" />
      </div>
    )
  }
  logIn(){
    location.href = '/api/auth/google'
  }
  componentDidMount(){
    console.log(window.location.href)
    if (window.location.hash.indexOf('access_token') !== -1){
      const url = window.location.hash
      const begIn = url.indexOf('access_token')
      const begUrl = url.slice(begIn)
      const endIn = begUrl.indexOf('&')
      const access_token = begUrl.slice(13, endIn)
      axios.post('api/auth/google', {access_token: access_token})
        .then( res => res.data)
        .then( user => this.props.setUser(user))
        .then( () => location.href = '/#/dashboard')
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
        dispatch({ type: 'SET_USER', user: user })
    }
  }  
}

export default connect(null, mapDispatchToProps)(Login)