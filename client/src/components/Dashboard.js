import React, { Component } from 'react';
import { connect } from 'react-redux';
import Events from './events/Events';
import EventList from './events/EventList';
import { _loadInvites } from '../store/invites';
import { _loadEvents } from '../store/events';

class Dashboard extends Component {
  render() {
    return (
      <div>
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

export default Dashboard;