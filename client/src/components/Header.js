import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    console.log(this.props.auth.user)
    return (
      <div>
        <h1>Header </h1>
        <Link to="/">Dashboard</Link>
        <Link to="/create_event">Create Event</Link>
        <h3>You are logged in as: {this.props.auth.user.email}</h3>
        <input type="button" onClick={this.props.logOut} value="Log Out" />
        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
        dispatch({ type: 'SET_USER', user: {} })
        location.href = '/'
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)