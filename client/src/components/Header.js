import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    return (
      <div className="p-3 mb-2 bg-light text-dark">
      <div className="container" style={{fontFamily: 'Andale Mono'}}>
        <div className="row">
          <div className="col-2">
            <Link to="/dashboard"><strong>Dashboard</strong></Link>
          </div>
          <div className="col-3">
            <Link to="/create_event"><strong>Create Event</strong></Link>
          </div>
          <div className="col-5">
            <h6><p align="right"><strong>Logged in as:</strong> {this.props.auth.user.email}</p></h6>
          </div>
          <div className="col-2">
            <h6><p align="right"><button type="button" className="btn btn-warning" onClick={this.props.logOut}><strong>Log Out</strong></button></p></h6>
          </div>
        </div>
      </div>
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