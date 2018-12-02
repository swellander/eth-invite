import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import CamCapture from './CamCapture';
import CreateEvent from './CreateEvent';
import EventDetail from './EventDetail';
import Login from './Login';
import SignUp from './SignUp';
import { connect } from 'react-redux';
import { _loadInvites } from '../store/invites';
import { _loadEvents } from '../store/events';

class Main extends Component {
  componentDidMount() {
    //take this out later
    //this.props.init(this.props.auth.user.id);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/camera" component={CamCapture} />
          <Route exact path="/rsvp" component={CamCapture} />
          <Route exact path="/confirm/:eventId" component={CamCapture} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/create_event" component={CreateEvent} />
          <Route path="/events/:id" component={EventDetail} />
          <Route path="/" component={Login} />
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));