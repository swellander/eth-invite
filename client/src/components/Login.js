import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Login extends Component {
  render() {
    return (
      <div style={{backgroundImage: 'url("bg.jpg")', display: 'flex', height: '70vh', alignItems: 'center', alignContent: 'center', textAlign: 'center', justifyContent: 'center'}}>
        <h1><p style={{top: '20%', fontFamily: 'Andale Mono'}}>F l a k e</p></h1>
        <p style={{position: 'absolute', bottom: '10%'}}><input className="btn btn-primary" type="button" onClick={this.logIn} value="Log In with Google" /></p>
      </div>
    )
  }
  logIn(){
    location.href = '/api/auth/google'
  }
  componentDidMount(){
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