import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <h1>Header </h1>
        <Link to="/">Dashboard</Link>
        <Link to="/create_event">Create Event</Link>
        <h3>You are logged in as: {this.props.auth.user.email}</h3>
        <input type="button" onClick={this.logOut} value="Log Out" />
        <hr />
      </div>
    )
  }
  logOut() {
    console.log('you should code a log out button')
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Header)