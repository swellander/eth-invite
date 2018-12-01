import React, { Component } from 'react';
import { connect } from 'react-redux';
import Events from './events/Events';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import EventList from './events/EventList';
import { _loadInvites } from '../store/invites';
import { _loadEvents } from '../store/events';

class Dashboard extends Component {
  componentDidMount() {
    // take this out later
    this.props.init(this.props.auth.user.id);
  }
  render() {
    return (
      <div>
        <Header />
        <h1>Dashboard</h1>
        <h3>Events I'm Invited To</h3>
        <hr />
        <EventList isOrganizer={false} />
        <h3>Events I'm Organizing</h3>
        <EventList isOrganizer={true} />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, events, invites }) => {
  const invitedEvents = invites.map(invite => invite.event);
  return {
    auth,
    events,
    invitedEvents
  }
};

const mapDispatchToProps = (dispatch, state, thing) => {
  return {
    init: (userId) => {
      dispatch(_loadInvites(userId));
      dispatch(_loadEvents(userId));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));