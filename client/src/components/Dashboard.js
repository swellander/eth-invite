import React, { Component } from 'react';
import { connect } from 'react-redux';
import Events from './events/Events';
import { _loadInvites } from '../store/invites';
import { _loadEvents } from '../store/events';

class Dashboard extends Component {
  componentDidMount() {
    this.props.init(this.props.auth.id);
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Events />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch, state, thing) => {
  return {
    init: (userId) => {
      dispatch(_loadInvites(userId));
      dispatch(_loadEvents(userId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);